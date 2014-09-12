loopback-search-index
=====================

[search-index](http://github.com/fergiemcdowall/search-index) connector for [loopback](http://github.com/strongloop/loopback). Very much under construction. Pull requests welcome.

# Installation

```
npm install loopback-search-index
```

Add this to your datasources.json:

```json
"search": {
  "name": "search",
  "connector": "loopback-search-index"
}
```

...and this in your model-config.json:

```json
"Search": {
  "public": true,
  "dataSource": "search"
}
```

# Usage

## Add documents to your index

```javascript
var loopback = require('loopback');
var Search = loopback.getModel('Search');

var doc = { title: 'foo', body: 'bar', type: 'baz' };
var filters = ['type'];

Search.add(doc, filters, function (err) {
  if (err) console.error('index puked:', err);
});
```

## Search

```javascript
var loopback = require('loopback');
var Search = loopback.getModel('Search');

var query = {
  query: {
    '*': 'foo'
  },
  filters: {
    'type': ['baz']
  }
};

Search.search(query, function (err, results) {
  if (err) return console.error('search failed:', err);
  
  console.log('search returned:', results);
})

## REST APIs

Use [loopback-explorer](http://github.com/strongloop/loopback-explorer) for API docs. 

# License

Search-index is released under the MIT license:

Copyright (c) 2014 Timo Saikkonen

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



