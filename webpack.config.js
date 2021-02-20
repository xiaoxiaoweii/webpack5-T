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
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
      {
        // 处理图片资源
        // 问题 处理不了img图片
        test: /\.(jpg|png|gif)$/,
        // 下载url-loader file-loader
        loader: "url-loader",
        options: {
          //  图片大小小于10kb 就会被base64处理
          // 优点 减少请求数量 减轻服务器压力
          // 缺点 图片体积会更大 文件请求速度更慢
          limit: 10 * 1024,
          // 因为url-loader默认使用es6模块化解析 儿html-loader引入图片是commonjs
          // 解析时会报错: [object Module]
          // 解决 关闭url-loader中的es6模块化 使用commonjs解析
          esModule: false,
          // [hash:10] 取图片的hash前十位
          // [ext] 取文件原来的扩展名
          name: '[hash:10].[ext]'
        },
      },
      {
        test: /\.html$/,
        // 处理html文件中的img图片 负责引入img 从而被url-loader进行处理
        loader: "html-loader",
      },
      // 打包其他资源 (除css js html以外的资源)
      {
        // 排除css js html
        exclude: /\.(css|js|html|less|jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        },
      }
    ],
  },
  // plugins的配置
  plugins: [
    // 详细
    // html-webpack-plugin
    // 默认创建空的html文件 引入打包输出的所有资源(JS/CSS)
    // 需求: 需要有结构的HTML文件 添加选项 复制html文件并引入打包输出的所有资源
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  // 模式 开发环境 development/生产环境 production
  mode: "development",
  // mode: 'production'

  // 开发服务器 devServer 用来自动化(自动编译 自动打开浏览器 自动刷新浏览器) 
  // 特点: 只会在内存中编译打包 不会有任何输出
  // 启动devServer指令为: npx webpack-dev-server
  devServer:{
    contentBase: resolve(__dirname,'build'),
    // 启动gzip压缩
    compress: true,
    // 指定开发端口号
    port: 3000,
    // 自动打开浏览器
    open: true
  }
};
