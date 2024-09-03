// webpack.config.js
const path = require('path');

module.exports = {
  // 다른 설정들...
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      services: path.resolve(__dirname, 'src/services/')
    },
    extensions: ['.js', '.jsx']
  }
};