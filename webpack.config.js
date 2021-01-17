/* 
  webpack.config.js webpack配置文件
  作用: 指示webpack干哪些活(当运行webpack指令会加载其中的配置)
  所有的构建工具都是基于nodejs平台运行的 模块化默认采用commonjs
*/

// resolve 用来拼接绝对路径的方法
const { resolve } = require("path");

module.exports = {
  // webpack配置
  // 入口起点
  entry: "./src/index.js",
  // 输出
  output: {
    // 输出文件名
    filename: "built.js",
    // 输出路径
    // __dirname nodejs的变量 代表当前文件的目录绝对路径
    path: resolve(__dirname, "build"),
  },
  // loader的配置
  module: {
    rules: [
      // 详细loader配置
    ],
  },
  // plugins的配置
  plugins: [
    // 详细
  ],
  // 模式 开发环境 development/生产环境 production
  mode: "development",
  // mode: 'production'
};
