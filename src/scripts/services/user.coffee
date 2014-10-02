angular.module 'yo-intervengo'

.service 'User', ($http, $q, localStorageService, ApiUrl) ->
  new class User
    # used to set initial data, eje. from http req or local storage
    setData = (user, data) ->
      user[prop] = data[prop] for own prop of user when data[prop]?
      user.followed = data.reports.concat data.pub_works
      user.likes = angular.extend data.like_reports or {}, data.like_pub_works or {}
      return
    authString = (token) -> "Basic #{btoa token}"
    typeOf = (item) -> if item.type is 'pub-work' then 'pub-work' else 'report'
    deferred = $q.defer()

    constructor: ->
      @id = null
      @email = null
      @name = null
      @photo = null
      @likes = {}
      @followed = []
      @loggedIn = deferred.promise
      Object.defineProperty @, 'storage', {value: localStorageService}

      # auto login if credentials exist
      if token = @storage.get('user')
        @useToken token
        do @updateProfile
      else @clearToken reason: 'no-user'

    follows: (item) -> @followed.find((e) -> e.id is item.id)?
    # TODO dislike
    follow: (item) ->
      if @follows item
        $http.delete("#{ApiUrl}/#{typeOf item}/#{item.id}/follow")
        index = @followed.findIndex((e) -> e.id is item.id)
        @followed.splice index,1
      else
        $http.post("#{ApiUrl}/#{typeOf item}/#{item.id}/follow")
        @followed.push item
    doesLike: (item) -> @likes[item.id] is true
    like: (item) ->
      if not @likes[item.id]? or @doesNotLike item
        substract = if @likes[item.id] is false then 1 else 0
        item.likes += 1
        item.dislikes -= substract
#        Report.update item.id, stats: like: item.stats.like, dislike: item.stats.like
      $http.put "#{ApiUrl}/#{typeOf item}/#{item.id}/like"
      @likes[item.id] = true
    doesNotLike: (item) -> @likes[item.id] is false
    dislike: (item) ->
      if not @likes[item.id]? or @doesLike item
        substract = if @likes[item.id] is true then 1 else 0
        item.likes -= substract
        item.dislikes += 1
#        Report.update item.id, stats: like: item.stats.like, dislike: item.stats.like
      $http.put "#{ApiUrl}/#{typeOf item}/#{item.id}/dislike"
      @likes[item.id] = false

    ###
      Saves token in storage and sets http auth headers
    ###
    useToken: (token) ->
      @storage.set 'user', token
      $http.defaults.headers.common['Authorization'] = authString token

    ###
      Delete token from storage, reject login promise, and unset headers
    ###
    clearToken: (reason = null) ->
      deferred.reject(reason)
      @storage.remove 'user'
      delete $http.defaults.headers.common.Authorization

    ###
      doRequest (private)
      resets loggedIn promise and handles the request success/failure
      same workflow for login, profile, register
    ###
    doRequest = (self,httpPromise, setToken = yes) ->
      # NOTE to self: this reassigns the promise losing then initial reference, doing @loggedIn.then from outside fails
      deferred = $q.defer()
      self.loggedIn = deferred.promise
      httpPromise.success (data) ->
        #fix reports/pub-works #TODO ask backend to fix
        for type in ['reports','pub_works']
          data[type].map (e) ->
            e.id = e._id
            delete e._id
            e.type = unless e.type? then 'pub-work' else if e.type is 'Q' then 'complaint' else 'request'
            return e
        setData self, data #fill object with user data
        self.useToken "#{self.email}:#{data.token}" if setToken
        deferred.resolve(self)
      .error (data,status) ->
        self.clearToken {reason: 'no-user', status: status, msg: data.msg}
      self.loggedIn 

    updateProfile: -> doRequest @, $http.get("#{ApiUrl}/user/me"), no

    login: (data) -> doRequest @, $http.post("#{ApiUrl}/login", data, {cache: no})

    register: (data) -> doRequest @, $http.post("#{ApiUrl}/register", data)