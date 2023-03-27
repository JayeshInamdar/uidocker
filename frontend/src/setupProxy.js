const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/api/v1/transaction/new", {
        target: "https://testbed-eid.scrive.com",
        changeOrigin: true,
        "secure": false
    })
  );
  app.use(
    createProxyMiddleware("/api/v1/transaction/", {
        target: "https://testbed-eid.scrive.com",
        changeOrigin: true,
        "secure": false
    })
  );
  app.use(
    createProxyMiddleware("/api/v2/documents", {
        target: "https://api-testbed.scrive.com",
        changeOrigin: true,
        "secure": false
    })
  );
  app.use(
    createProxyMiddleware("/v4/locations", {
        target: "https://api.podium.com",
        changeOrigin: true,
        "secure": false
    })
  );
  // app.use(
  //   createProxyMiddleware("/default/nrma-sixt-lambda", {
  //       target: "https://mvnch8pox9.execute-api.ap-south-1.amazonaws.com",
  //       changeOrigin: true,
  //       "secure": false
  //   })
  // );
};
