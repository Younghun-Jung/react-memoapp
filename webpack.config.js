// webpack load
var webpack = require('webpack');

// 아래 객체를 module로 내보내겠다.
module.exports = {
    entry: ['react-hot-loader/patch', './src/index.js'],
    // 합친 파일들을 bundle.js 로 출력
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    //개발 서버 설정
    devServer: {
        hot: true, // 수정될 때마다 reload
        inline: true, // hot reloading에 필요서 webpack devserver의 클라이언트를 bundle에 같이 넣어주는 것
        host: '0.0.0.0', // 로컬.
        port: 4000, // 개발 서버의 port
        contentBase: __dirname + '/public/' // index 파일의 위치
    },

    module: {
        loaders: [
            {
                test: /.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'react'],
                    plugins: ["react-hot-loader/babel"]
                }
            }
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin() //webpack의 hotload를 지원하는 플러그 인
    ]
}
