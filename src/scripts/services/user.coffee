angular.module 'yo-intervengo'

.service 'User', ($http, $q, localStorageService, ApiUrl, Report) ->
  new class User
    # used to set initial data, eje. from http req or local storage
    setData = (user, data) -> user[prop] = data[prop] for own prop of user when data[prop]?; return
    authString = (token) -> "Basic #{btoa token}"
    deferred = $q.defer()

    constructor: ->
      @id = null
      @email = null
      @name = null
      @photo = null
      @followed = []
      @liking = {}
      @loggedIn = deferred.promise
      Object.defineProperty @, 'storage', {value: localStorageService}
      # auto login if credentials exist
      if token = @storage.get('user')
        @useToken token
        do @updateProfile
      else @clearToken reason: 'no-user'

    newReport: (data) ->
      data.creator = @id
      data = Report.new data
      @follow data

    follows: (item) -> @followed.find((e) -> e.id is item.id)?
    # TODO dislike
    follow: (item) ->
      if @follows item
        index = @followed.findIndex((e) -> e.id is item.id)
        @followed.splice index,1
      else @followed.push item
      @storage.set 'user',@
    likes: (item) -> @liking[item.id] is true
    like: (item) ->
      if not @liking[item.id]? or @dislikes item
        substract = if @liking[item.id] is false then 1 else 0
        item.stats.like += 1
        item.stats.dislike -= substract
        Report.update item.id, stats: like: item.stats.like, dislike: item.stats.like
      @liking[item.id] = true
      @storage.set 'user',@
    dislikes: (item) -> @liking[item.id] is false
    dislike: (item) ->
      if not @liking[item.id]? or @likes item
        substract = if @liking[item.id] is true then 1 else 0
        item.stats.like -= substract
        item.stats.dislike += 1
        Report.update item.id, stats: like: item.stats.like, dislike: item.stats.like
      @liking[item.id] = false
      @storage.set 'user',@

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
      deferred = $q.defer()
      self.loggedIn = deferred.promise
      httpPromise.success (data) ->
        setData self, data #fill object with user data
        self.useToken "#{self.email}:#{data.token}" if setToken
        deferred.resolve(self)
      .error (data,status) ->
        self.clearToken {reason: 'no-user', status: status, msg: data.msg}
      self.loggedIn 

    updateProfile: -> doRequest @, $http.get("#{ApiUrl}/user/me"), no

    login: (data) -> doRequest @, $http.post("#{ApiUrl}/login", data, {cache: no})

    register: (data) -> doRequest @, $http.post("#{ApiUrl}/register", data)