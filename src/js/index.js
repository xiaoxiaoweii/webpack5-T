/* 
  index.js : webpack 入口起点文件

  1. 运行指令 ：
  开发指令 webpack ./src/index.js -o ./build/built.js --mode=development
  webpack 会以 ./src/index.js 为入口文件打包 打包后输出到 ./build/built.js
  整体打包环境是开发环境
  生产指令 webpack ./src/index.js -o ./build/built.js --mode=production
  webpack 会以 ./src/index.js 为入口文件打包 打包后输出到 ./build/built.js
  整体打包环境是生产环境

  2. 结论 
  1.webpack能处理js/json资源 不能处理css/img等其他资源
  2.生产环境和开发环境将ES6模块化编译成浏览器识别的模块化
  3.生产环境必开发环境多一个压缩js代码
*/
// 引入样式
import "../css/index.css";
import "../css/index.less";
// 引入iconfont 样式文件
// import '../css/iconfont.css'
function add(x, y) {
  return x + y;
}
console.log(add(1, 2));
