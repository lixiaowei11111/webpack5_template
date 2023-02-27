// react 18之前
// index.tsx
// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// ReactDOM.render(<App />, document.getElementById("root"));

// 入口文件 相当于 main函数
// react18 之后
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
console.log(process.env, 'process.env') // 通过webpack的DefinePlugin接受替换的全局变量 aaa

createRoot(document.getElementById('root')).render(<App />)
