angular.module 'yo-intervengo'

.service 'User', ($http) ->
    new class User
        # used to set initial data, eje. from http req or local storage
        setData = (user, data) ->
            user[prop] = data[prop] for own prop of user when data[prop]?
            if data.followed?.length
                user._followed.length = 0 # empty array
                Array::push.apply user._followed, data.followed
            if data.likes? and Object.keys(data.likes).length
                delete user.likes[key] for own key of user.likes # clean object
                user.likes[key] = val for key of data.likes
            return

        constructor: ->
            @email = null
            @name = null
            @photo = ''
            @loggedIn = no
            Object.defineProperty @, 'followed', value: []
            Object.defineProperty @, 'likes', value: {}

        follows: (item) ->
            @followed.filter((itm) -> itm.id is item.id)[0]?
        follow: (item) ->
            if @follows item then @followed else @followed.push item
        likes: (item) -> @likes[item.id] is true
        like: (item) -> @likes[item.id] = true
        dislikes: (item) -> @likes[item.id] is false
        dislike: (item) -> @likes[item.id] = false

        login: ->
            # TODO: http request
            # $http.post('/login', data).success => setData @, data
            # test data
            data = email: 'pepito@email.com', name: 'Pepito Perez'
            setData @, data
            @loggedIn = yes
