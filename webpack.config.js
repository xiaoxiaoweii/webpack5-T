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
// mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// optimize-css-assets-webpack-plugin 压缩css文件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 设置 node js环境变量
process.env.NODE_ENV = 'development'
module.exports = {
  // webpack配置
  // 入口起点
  entry: "./src/js/index.js",
  // 输出
  output: {
    // 输出文件名
    filename: "js/built.js",
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
          // "style-loader",
          // 取代style-loader 提取css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件以字符串的形式变成commonjs的模块加载到js中 里面的内容是样式字符串
          "css-loader",
          // css兼容性处理 postcss postcss-loader postcss-preset-env 帮postcss找到package.json中browserslist里面的配置 通过配置加载指定的兼容性样式
          // 使用loader的默认配置
          
          /* "browserslist": {
            // 开发环境 设置node环境变量 process.env.NODE_ENV = development
            "development": [
              "last 1 chrome verson",
              "last 1 firfox verson",
              "last 1 safari verison"
            ],
            // 生产环境 默认是看生产环境
            "production": [
              ">0..2%",
              "not dead",
              "not op_mini all"
            ]
          } */
          // 'postcss-loader'
          // 修改loader的配置
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')
              ]
            }
          }
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
          //  图片大小小于8kb 就会被base64处理
          // 优点 减少请求数量 减轻服务器压力
          // 缺点 图片体积会更大 文件请求速度更慢
          limit: 8 * 1024,
          // 因为url-loader默认使用es6模块化解析 儿html-loader引入图片是commonjs
          // 解析时会报错: [object Module]
          // 解决 关闭url-loader中的es6模块化 使用commonjs解析
          esModule: false,
          // [hash:10] 取图片的hash前十位
          // [ext] 取文件原来的扩展名
          name: '[hash:10].[ext]',
          outputPath: 'imgs'
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
          name: '[hash:10].[ext]',
          outputPath: 'media'
        },
      },
      /* 
        语法检查 eslint-loader 依赖eslint
        注意: 只检查自己写的源代码 第三方的库不检查
        设置检查规则:
          package.json中eslintConfig中设置 推荐使用airbnb ---> 下载插件 eslint-config-airbnb-base eslint eslint-plugin-import
      */
     {
       test: /\.js$/,
       loader: 'eslint-loader',
        //  检查时排查第三方的库 
       exclude: /node_modules/,
       options: {
        //  自动修复
         fix: true
       }
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
    new MiniCssExtractPlugin({
      // 对输出文件进行重命名
      filename: 'css/built.css'
    }),
    // 压缩css文件代码
    new OptimizeCssAssetsWebpackPlugin({

    })
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
