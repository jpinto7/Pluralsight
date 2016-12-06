const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');

new WebpackDevServer(webpack(config), config.devServer)
.listen(config.devServer.port, config.devServer.host, (err) => {
  if (err) {
    console.log(err);
  }
  console.log('Listening at ' + config.devServer.host +':' + config.devServer.port);
  console.log('Opening your system browser...');
  open('http://' + config.devServer.host + ':' + config.devServer.port);
});
