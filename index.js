var loopback = require('loopback');
var SearchConnector = require('./lib/search-connector');

exports = module.exports = SearchConnector;

exports.createSearchModel = function (options) {
  options = options || {};

  var searchDataSource = loopback.createDataSource({
    connector: SearchConnector
  });

  var searchModel = searchDataSource.createModel(options.name || 'Search', {},
    { plural: options.plural || 'Search' });

  searchModel.remoteMethod('search', {
    accepts: [
      {
        arg: 'query',
        type: 'object',
        required: true,
        http: {
          source: 'body'
        }
      }
    ],
    returns: { root: true },
    http: {
      verb: 'POST',
      path: '/query'
    }
  });

  searchModel.remoteMethod('match', {
    accepts: [
      {
        arg: 'keyword',
        type: 'string',
        required: true
      }
    ],
    returns: { root: true },
    http: {
      verb: 'GET',
      path: '/match/:keyword'
    }
  });

  searchModel.remoteMethod('get', {
    accepts: [
      {
        arg: 'key',
        type: 'string',
        required: true
      }
    ],
    returns: { root: true },
    http: {
      verb: 'GET',
      path: '/get/:key'
    }
  });

  searchModel.remoteMethod('stats', {
    returns: { root: true },
    http: {
      verb: 'GET',
      path: '/stats'
    }
  });

  return searchModel;
};

exports.search = exports.createSearchModel();