const path = require('path');

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
  // resolve: {
	// 	alias: {
	// 			'@': path.resolve(__dirname, 'src'), // src 폴더
	// 			components: path.resolve(__dirname, 'src/components'), // components 폴더
	// 			pages: path.resolve(__dirname, 'src/pages'), // pages 폴더
	// 			services: path.resolve(__dirname, 'src/services'), // services 폴더
	// 	},
	// 	extensions: ['.js', '.jsx'], // 자동으로 인식할 파일 확장자
	// },
	// devtool: 'source-map', // 소스 맵 설정 (디버깅 용이)
	// devServer: {
	// 		contentBase: path.join(__dirname, 'dist'), // 서버의 콘텐츠 기본 경로
	// 		compress: true, // gzip 압축
	// 		port: 3000, // 서버 포트
	// },
};

