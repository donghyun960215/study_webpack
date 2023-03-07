# Webpack

## Webpack https://webpack.js.org/

## 실행방법
```plaintext
1. npm init -y 를 입력하여 npm 프로젝트 시작
2. npm i -D webpack webpack-cli webpack-dev-server@next 를 입력하여 webpack 다운
   cil과 dev 는 메이저 버전을 일치 시켜야한다.
3. package.json 파일에 script 부분을 수정해준다.
   "dev": "webpack-dev-server --mode develoment",
   "build": "webpack --mode production"
   상기 내용 추가.
4. webpack 같은 경우에는 parcel bundler 와 다르게 구성 파일을 하나 추가해줘야한다.
5. webpack.config.js 파일을 생성해준다.
6. 생성 후 구성옵션을 작성해준다
```
```js
////webpack.config.js 파일///
//import
//require('path'); 전역 모튤을 가지고 와서 path에 할당한다.
const path = require('path');

// export
module.exports = {
  //parcel index.html
  //parcel 과 같이 파일을 읽어들이기 시작하는 진입점을 설정해줘야한다. 
  //하지만 webpack 같은경우 CLI로 입력하는게 아니고 구성 옵션을 추가해준다.
  //webpack 같은 경우는 진입점이 html보다는 js를 사용한다.
  entry: './js/main.js',

  // 결과물(번들)을 반환하는 설정
  // path 같은 경우 절대경로 설정이 필요하다.
  output: {
    //할당된 path를 가져와서 사용을 한다.
    path: path.resolve(__dirname, 'dist'),
    //relative()같은 경우는 첫번째 인수와 두번째 인수의 경로를 합쳐주는 역활을 한다.
    //__dirname 경우 nodejs에서 전역적으로 사용할 수 있는 변수이다. 현재파일의 경로

    filename: 'main.js',
    //path 의 폴더명과
    //filename 의 파일명을 변경해주면 변경한 그대로 폴더와 파일이 생성된다.

    //구성옵션을 바꿔도 바꾸기전의 파일과 폴더가 남아져 있다. 그 때 clean을 사용한다.
    clean: true
  }
}
```
```plaintext
output 같은 경우 path 와 filename을 지정을 안하게 되면
폴더명은 dist로 하고 파일명 entry의 파일명을 따와서 자동생성한다.
```

## webpack-plugin
```plaintext
1. npm i -D html-webpack-plugin 를 입력해서 패키지 다운로드 
2. index.html 파일 생성 후
3. webpack.config.js 파일에서 옵션 추가
```
```js
////webpack.config.js 파일///
//import
const path = require('path');
//다운로드 받은 패키지를 import 한다.
const Htmlplugin = require('html-webpack-plugin');

// export
module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    //방금 가져온 패키지를 담은 변수를 생성자함수처럼 입력한다.
    new Htmlplugin({
      template: './index.html'
    })
  ]
}
```
```plaintext
template: './index.html' 은 루트경로에 만들어 놓은 html를 지칭한다.
그렇게 되면 webpack이 기본적으로 entry로 시작해서 js 폴더안에 main.js를 읽어드려서
그것에 대한 결과를 output에 대한 옵션으로 만들게 된다.
그 만들어 내는 과정에서 plugins의 명시되어 있는 여러가지 plugin들을 활용하게된다.
```

## 정적파일 생성 (static)
```plaintext
1. static 폴더를 생성하고 그 안에 정적이미지를 넣는다.
2. npm i -D copy-webpack-plugin 를 입력해서 패키지 다운로드
3. webpack.config.js 파일에서 옵션 추가
```
```js
////webpack.config.js 파일///
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
  plugins: [
    //방금 가져온 패키지를 담은 변수를 생성자함수처럼 입력한다.
    new Htmlplugin({
      template: './index.html'
    }),
    ///////정적 파일 생성//////
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
```

## module

### css
```plaintext
* 방법 1
1. static 폴더에 css 폴더 생성후 css파일 생성 해서 npm run dev 를 실행
2. 그러면 static 폴더에 있는 css폴더가 dist폴더에 변경되어 들어간다.

* 방법 2
1. css 폴더를 루트경로로 뺀다.
2. js파일에 import './css/main.css' 를 추가한다.
@webpack 자체는 css파일을 읽을 수 없다. 단지 js 파일과 합쳐서 dist폴더에 내어주는 역할만 할 수 있다.

* 방법 3
1. css 파일을 읽을 수 있는 패키지를 다운로드한다.
2. npm i -D css-loader style-loader 를 입력하여 두개의 패키지를 다운로드한다.
3. js 파일에 import 해준다.
   import '../css/main.css'
```
```js
///////방법 3///////
////webpack.config.js 파일///
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
  }
}
```

### scss
```js
////webpack.config.js 파일///
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
        test: /\.s?css$/,
        use: [
          'style-loader',//해석된 내용을 html부분의 style 태그에 삽입해주는 역활을 한다.
          'css-loader', //js파일에서 css파일을 해석할 수 있도록 해준다.
          'sass-loader'
        ]
      }
    ]
  }
}
```
```plaintext
1. 기존 module 안에 rules부분에다가 s? 부분을 추가해준다 그렇게되면
   css뿐만이 아니라 scss파일도 찾아서 적용을 해준다.
2. 그리고 추가적으로 패키지를 다운 받는다.
   npm i -D sass-loader sass 두개의 패키지를 다운 받는다.
3. import '../scss/main.scss'
```

## autoprefixer
```js
////webpack.config.js 파일///
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
        test: /\.s?css$/,
        use: [
          'style-loader',//해석된 내용을 html부분의 style 태그에 삽입해주는 역활을 한다.
          'css-loader', //js파일에서 css파일을 해석할 수 있도록 해준다.
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
```
```js
///.postcssrc.js 파일///
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
```plaintext
1. npm i -D postcss autoprefixer postcss-loader 를 입력해서 패키지 다운로드
2. webpack.config.js 파일 수정
3. 여기서 중요한 점은 rules작성시 sass-loader 보다 먼저 옵션을 추가해준다.
4. package.json 파일에 옵션을 추가해준다.
   "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
5. .postcssrc.js 파일 생성 후 구성옵션 삽입
   
```