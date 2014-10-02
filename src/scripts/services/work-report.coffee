angular.module 'yo-intervengo'

.factory 'PubWork', ($http, ApiUrl, localStorageService) ->
  storage = localStorageService
  storage.set('pub-works', []) unless storage.get('pub-works')
  get: (id) ->
    $http.get("#{ApiUrl}/pub-work/#{id}", cache:on)
    .then (res) ->
      pw = res.data
      pw.id = pw._id
      delete pw._id
      pw.type = 'pub-work'
      res.data
  list: (near = false) ->
    $http.get("#{ApiUrl}/pub-work#{if near then '/near' else ''}", cache: on)
    .then (res) ->
      data = res.data.map (e) ->
        e.id = e._id
        delete e._id
        e.type = 'pub-work'
        return e
      storage.set 'pub-works', data
      data

.factory 'Report', ($http, $q, localStorageService, ApiUrl) ->
  # TODO: data offline
  storage = localStorageService
  storage.set('reports', []) unless storage.get('reports')
  new: (data) ->
    $http.post "#{ApiUrl}/report/#{data.type}", data
  list: (near = false) ->
#    storage.get 'reports'
    $http.get("#{ApiUrl}/report#{if near then '/near' else ''}", cache: on)
    .then (res) ->
      data = res.data.map (e) ->
        e.id = e._id
        delete e._id
        e.type = if e.type is 'Q' then 'complaint' else 'request'
        return e
      storage.set 'reports', data
      data

  get: (id) ->
    $http.get("#{ApiUrl}/report/#{id}")
    .then (res) ->
      rep = res.data
      rep.id = rep._id
      delete rep._id
      rep.type = if rep.type is 'Q' then 'complaint' else 'request'
      res.data
  update: (id, data) ->
    reports = storage.get('reports')
    if (index = reports.findIndex((e) -> e.id is id)) >= 0
      reports[index] = angular.extend(reports[index], data)
    storage.set 'reports', reports