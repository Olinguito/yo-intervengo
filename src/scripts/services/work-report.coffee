angular.module 'yo-intervengo'

.factory 'PubWork', ($http) ->
  get: (id) -> $http.get ""

.factory 'Report', ($http, $q, localStorageService) ->
  storage = localStorageService
  storage.set('reports', []) unless storage.get('reports')
  new: (data) ->
    # add missing data
    data.stats = like: 0, dislike: 0
    data.id = Date.now().toString(36) # new unique? id
    # get localStorage data
    reports = storage.get('reports')
    reports.push data
    # save array
    storage.set 'reports', reports
    data # newly created item should be returned
  list: -> storage.get 'reports'
  get: (id) ->
    reports = storage.get('reports')
    reports.find((e) -> e.id is id)
  update: (id, data) ->
    reports = storage.get('reports')
    if (index = reports.findIndex((e) -> e.id is id)) >= 0
      reports[index] = angular.extend(reports[index], data)
    storage.set 'reports', reports