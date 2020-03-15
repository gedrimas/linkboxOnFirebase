const path = require('path');
module.exports = {
  //do stuff with the webpack config...
  webpack(config, optimization, env) {


      config.output.filename = 'bundle.js';
      const BUILD_DIR = path.resolve(__dirname, '../../../linkboxfierbase/public');

      config.output.path = BUILD_DIR
      //config.output.path = __dirname
      config.mode = "development";
      //config.devtool = "inline-cheap-module-source-map"
      config.optimization = {};
    
    return config;
  }

};