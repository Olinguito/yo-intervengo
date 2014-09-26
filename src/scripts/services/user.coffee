angular.module 'yo-intervengo'

.service 'User', ($http, $q, localStorageService, Report) ->
  new class User
    # used to set initial data, eje. from http req or local storage
    setData = (user, data) -> user[prop] = data[prop] for own prop of user when data[prop]?; return

    constructor: ->
      @id = null
      @email = null
      @name = null
      @photo = null
      @loggedIn = no
      @followed = []
      @liking = {}
      Object.defineProperty @, 'storage', {value: localStorageService}
      Object.defineProperty @, '_deferred', {value: $q.defer(), writable: yes}
      # TODO remove when backend available
      @pwd = null
      if user = @storage.get('user')
        setData @, user
      else
        @storage.set('user', {})
      @storage.set('users', []) unless @storage.get('users')

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

    ready: (fn) ->
      @_deferred.promise.then => do fn
      return @
    error: (fn) ->
      @_deferred.promise.catch (status) => fn(status)
      return @

    # TODO change when backend available
    login: (data) ->
      user = @storage.get('users').find((u)-> (u.email is data.email) and (u.pwd is btoa(data.pwd)))
      !!user
    ###
    login: (data) ->
      @_deferred = $q.defer()
      $http.post("#{Conf.api}/login", data, {cache: no}).then (res) =>
        setData @, res.data.result
        @loggedIn = yes
        @_deferred.resolve()
      , (res) =>
        @loggedIn = no
        @_deferred.reject res.status
      return @
     ###

    # TODO change when backend available
    register: (data) ->
      user = angular.copy data
      user.id = Date.now().toString(36)
      user.pwd = btoa(data.pwd)
      user.loggedIn = yes
      setData @,user
      users = @storage.get('users')
      users.push @
      @storage.set 'users', users
      @storage.set 'user', @

    ###
    register: (data) ->
      $http.post("#{Conf.api}/register", data).success =>
        setData @, data
        @loggedIn = yes
        @_deferred.resolve()
      return @
    ###
