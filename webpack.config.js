/* 
  webpack.config.js webpack配置文件
  作用: 指示webpack干哪些活(当运行webpack指令会加载其中的配置)
  所有的构建工具都是基于nodejs平台运行的 模块化默认采用commonjs
*/

/* 

 loader 下载 --> 使用(配置loader)
 plugins 下载 --> 引入 --> 使用

*/

// resolve 用来拼接绝对路径的方法
const { resolve } = require("path");
// html-webpack-plugin 引入
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
      // 不同文件配置不同loader进行处理
      {
        // 匹配哪些文件 后缀名以.css结尾会进行处理
        test: /\.css$/,
        use: [
          // use数组中loader执行顺序 从右到左 从下到上依次执行
          // 创建style标签将js中的css样式资源插入进去 添加到header中生效
          "style-loader",
          // 将css文件以字符串的形式变成commonjs的模块加载到js中 里面的内容是样式字符串
          "css-loader",
        ],
      },
      {
        test: /\.less$/,
        use: [
          // 同前
          "style-loader",
          // 同前
          "css-loader",
          // 将less文件编译为css文件
          "less-loader",
        ],
      },
    ],
  },
  // plugins的配置
  plugins: [
    // 详细
    // html-webpack-plugin
    // 默认创建空的html文件 引入打包输出的所有资源(JS/CSS)
    // 需求: 需要有结构的HTML文件 添加选项 复制html文件并引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  // 模式 开发环境 development/生产环境 production
  mode: "development",
  // mode: 'production'
};
