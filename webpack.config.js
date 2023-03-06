//import
const path = require('path');
//다운로드 받은 패키지를 import 한다.
const Htmlplugin = require('html-webpack-plugin');
const Copyplugin = require('copy-webpack-plugin');

// export
module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',//해석된 내용을 html부분의 style 태그에 삽입해주는 역활을 한다.
          'css-loader' //js파일에서 css파일을 해석할 수 있도록 해준다.
        ]
      }
    ]
  },

  plugins: [
    //방금 가져온 패키지를 담은 변수를 생성자함수처럼 입력한다.
    new Htmlplugin({
      template: './index.html'
    }),
    //정적 파일 생성
    new Copyplugin({
      patterns: [
        { from: 'static'}  //지정 폴더명
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }

}