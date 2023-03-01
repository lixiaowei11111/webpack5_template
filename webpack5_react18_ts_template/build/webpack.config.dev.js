const webpackMerge = require('webpack-merge')
const path = require('path')
const webpack = require('webpack')

const config = require('dotenv').config({
	path: path.resolve(__dirname, '../env/.env.' + process.env.NODE_ENV),
})

const baseConfig = require('./webpack.config.base')

/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */
const devServer = {
	https: true,
	host: 'localhost', // 服务器
	// contentBase: path.join(__dirname, "../public"),
	// watchContentBase: true,
	// publicPath: "/",
	// webpack5 中 contentBase选项 被替换为 static选项
	static: {
		directory: path.join(__dirname, '../public'),
		publicPath: '/',
		watch: true,
	},
	compress: true, // gzip
	historyApiFallback: true, // history模式提供404页面
	hot: true, // 热更新
	// clientLogLevel: "error", // 浏览器中显示的错误级别 使用client{logging替代}
	client: {
		logging: 'error',
	},
	open: true, // 服务器启动后默认打开浏览器
	// watchOptions 被放在devServer 外面了
	watchFiles: {
		paths: ['src/**/*', 'public/**/*'],
		options: {
			usePolling: false,
		},
	},
}

const devConfig = {
	mode: process.env.NODE_ENV,
	devServer: devServer,
	watchOptions: {
		ignored: /node_modules/,
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(config), // 如果没有用单双引号分别包一层,则会导致 value做为一个未定义的变量暴露,// 加单双引号,或者使用JSON.strigfy(config)
		}),
	],
}
// 本地开发服务的环境配置, 不会对 生成环境生效
module.exports = webpackMerge.merge(baseConfig, devConfig)
