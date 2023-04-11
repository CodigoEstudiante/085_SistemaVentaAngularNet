const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:64159';

const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/api/rol",
      "/api/usuario",
      "/api/categoria",
      "/api/producto",
      "/api/venta",
      "/api/dashboard",
   ],
    target: target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
