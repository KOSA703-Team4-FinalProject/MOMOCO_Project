const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/login', {
      target: 'https://github.com',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware('/user', {
      target: 'https://api.github.com',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware('/backlogin', {
      target: 'http://localhost:8090/controller',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8090/controller',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware('/cal', {
      target: 'http://localhost:8090/controller',
      changeOrigin: true,
    }),
  )
  app.use(
    createProxyMiddleware('/board', {
      target: 'http://localhost:8090/controller',
      changeOrigin: true,
    }),
  )
}
