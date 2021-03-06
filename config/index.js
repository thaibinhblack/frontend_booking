// config/index.js
module.exports = {
    // ...
    dev: {
      proxyTable: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }