const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const baseConfig = require('./base');


module.exports = {
  ...baseConfig,
  mode: 'development',

  devServer: {
    inline: true,
    historyApiFallback: true,
    compress: true,
    port: 1233,
    hotOnly: true,
    host: '0.0.0.0',
  },

  plugins: [
    ...baseConfig.plugins,

    new webpack.LoaderOptionsPlugin({ debug: true }),

    new webpack.HotModuleReplacementPlugin(),

    new BrowserSyncPlugin(
      // BrowserSync options
      {
        host: 'localhost',
        port: 1234,
        proxy: 'http://localhost:1233',
      },
      // plugin options
      {
        // prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      },
    ),
  ],
};
