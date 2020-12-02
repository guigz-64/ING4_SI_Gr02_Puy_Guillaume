

const url = require('url')
const qs = require('querystring')

module.exports = {

  serverHandle: function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)
    console.log(path)
    console.log(params['name]'])
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (path === '/hello' && 'name' in params && params['name']!='Guillaume') {
      res.write('Hello ' + params['name'])
    } else if (path === '/hello' && params['name']==='Guillaume') {
      res.write('Hello I\'m Guillaume and I study at ECE Paris')
    }
    else {
      res.write('404 : Page Not Found')
    }

    res.end();
  }
}
