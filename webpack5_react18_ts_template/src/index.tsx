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
import { Provider } from 'react-redux'
import {
	BrowserRouter,
	createBrowserRouter,
	RouterProvider,
	Route,
	createRoutesFromElements,
} from 'react-router-dom'
import ErrorBoundary from '@/components/ErrorBoundary'

import store from '@/redux'
import App from './App'

console.log(process.env, 'process.env') // 通过webpack的DefinePlugin接受替换的全局变量

// //1. 路由的常规创建方法
// createRoot(document.getElementById('root')).render(
// 	<ErrorBoundary>
// 		<Provider store={store}>
// 			<BrowserRouter>
// 				<App />
// 			</BrowserRouter>
// 		</Provider>
// 	</ErrorBoundary>,
// )

// 2. 使用 createBrowserRouter 创建
const router = createBrowserRouter([
	{
		path: '/home',
		element: <App />,
		loader: null,
		action: null,
		errorElement: <ErrorBoundary />,
		children: null,
	},
])
// 或者 使用 createRoutesFromElements
// const router = createBrowserRouter(
// 	createRoutesFromElements(
// 		<Route
// 			path="home"
// 			element={<App />}
// 			loader={null}
// 			action={null}
// 			errorElement={<ErrorBoundary />}
// 			children={null}
// 		/>,
// 	),
// )

createRoot(document.getElementById('root')).render(
	<ErrorBoundary>
		<Provider store={store}>
			<RouterProvider router={router}></RouterProvider>
		</Provider>
	</ErrorBoundary>,
)
