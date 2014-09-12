var assert = require('assert'),
      path = require('path'),
      uuid = require('node-uuid');

var si;

function SearchDataAccessObject() {}

SearchDataAccessObject.search = function (query, callback) {
  assert.ok(callback, 'callback required');

  si.search(query, function (results) {
    callback(null, results);
  });
};

SearchDataAccessObject.get = function (key, callback) {
  assert.ok(key, 'key required');
  assert.ok(callback, 'callback required');

  si.get(key, function (results) {
    callback(null, results);
  });
};

SearchDataAccessObject.match = function (keyword, callback) {
  assert.ok(keyword, 'keyword required');
  assert.ok(callback, 'callback required');

  si.match(keyword, function (results) {
    callback(null, results);
  });
};

SearchDataAccessObject.add = function (batch, filters, callback) {
  assert.ok(batch, 'nothing to add');

  si.add(batch, uuid.v4(), filters, function (msg) {
    if (!callback) return;

    if (msg.indexOf('[success]') === 0) return callback();

    return callback(msg);
  });
};

SearchDataAccessObject.remove = function (key, callback) {
  assert.ok(key, 'key required');

  si.del(key, function (msg) {
    if (!callback) return;

    if (msg.indexOf('[success]') === 0) return callback();

    return callback(msg);
  });
};

SearchDataAccessObject.stats = function (callback) {
  si.tellMeAboutMySearchIndex(function (msg) {
    callback(null, msg);
  });
}

function SearchConnector(options) {
  if (!this instanceof SearchConnector)
    return new SearchConnector(options);

  options = options || {};

  if(!si) {
    si = require('search-index');
    si.configure(options.searchIndex);
  }
}

exports.SearchConnector = SearchConnector;

exports.initialize = function (dataSource, callback) {
  var settings = dataSource.settings || {};
  settings.searchIndex = settings.searchIndex || {
    indexPath: path.join(process.cwd(), 'si/')
  };

  var connector = new SearchConnector(settings);

  SearchDataAccessObject.connector = connector;

  connector.DataAccessObject = SearchDataAccessObject;

  dataSource.connector = connector;
  dataSource.connector.dataSource = dataSource;

  for (var m in SearchDataAccessObject.prototype) {
      var method = SearchDataAccessObject.prototype[m];
      if ('function' === typeof method) {
          connector[m] = method.bind(connector);
          for(var k in method) {
              connector[m][k] = method[k];
          }
      }
  }

  callback();
};