module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig;
    },
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // List of deprecated properties to remove
    const deprecatedProps = [
      'onAfterSetupMiddleware',
      'onBeforeSetupMiddleware',
      'https',
      'http2',
      'key',
      'cert',
      'ca',
      'pfx',
      'pfxPassphrase',
      'requestCert',
      'disableHostCheck'
    ];
    
    // Remove all deprecated properties
    deprecatedProps.forEach(prop => {
      if (devServerConfig[prop] !== undefined) {
        delete devServerConfig[prop];
      }
    });
    
    // Add the new setupMiddlewares function
    devServerConfig.setupMiddlewares = (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // Add any custom middleware here if needed
      // This replaces the functionality from deprecated middleware hooks

      return middlewares;
    };

    return devServerConfig;
  },
};