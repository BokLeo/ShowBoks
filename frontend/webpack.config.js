const path = require('path');
console.log("lkasndlkasndlkasn :::: ", path.resolve(__dirname, 'src/assets/icons'));


module.exports = {
  // 다른 설정들...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
              outputPath: 'images',
              publicPath: '/images',
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
		alias: {
			'@icons': path.resolve(__dirname, 'src/assets/icons'),
			components: path.resolve(__dirname, 'src/components/'),
			pages: path.resolve(__dirname, 'src/pages/'),
			services: path.resolve(__dirname, 'src/services/'),
		},
		extensions: ['.js', '.jsx'],
	},
};

