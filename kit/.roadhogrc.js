const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/m/${version}/`,
  // publicPath: process.env.sit === 'dev' ? `/www/Public/kit-dva/devDist/${version}/` : `/www/Public/kit-dva/dist/${version}/`,
  outputPath: process.env.sit === 'dev' ? `./devDist/${version}` : `./dist/${version}`,
  define: {
    "phixSit": process.env.sit,
  },
  // 接口代理示例
  proxy: {
    "/api/v1": {
      "target": "http://10.10.9.102:19762",// "https://api.blockex.ai/api",// "http://10.10.9.189:19762", //"https://api.blockex.ai/api",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1": "" }
    },
    "/api/v2": {
      "target": "https://api.blockex.ai/api",// "http://10.10.9.189:19762", //"https://api.blockex.ai/api",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v2": "" }
    },
  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
