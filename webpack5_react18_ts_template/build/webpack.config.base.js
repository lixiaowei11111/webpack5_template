//  config/webpack.config.base.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const { GenerateSW } = require('workbox-webpack-plugin')
// 使用 workbox 官方插件来实现离线缓存
/**
 * @type {import('webpack').Configuration}
 */

function resolve(dir) {
	return path.join(__dirname, '..', dir)
	// .. 相当于 ../上一级 path.join 相当于一个 路径计算器
}
const isDev = process.env.NODE_ENV !== 'production'
console.log(process.env, 'process.env')
module.exports = {
	target: 'web', // web为默认值, 还可以使用 electron-main electron-renderer electron-prelaod node
	// 构建同构应用时, target可以为 node
	// 构建electron可以为以上对应模式
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/index.tsx',
		// detail:"./activity/index.tsx" 多页面打包功能
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].[hash].js',
		// publicPath:
		//   process.env.NODE_ENV === 'production'
		//     \? '生产环境CDN异步静态资源URI'
		//     : '开发环境CDN异步静态资源URI',
	},
	resolve: {
		// resolve选项是Webpack中的一个配置选项，用于设置模块如何被解析。
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		// 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在,导入文件时,省略后缀名。
		alias: {
			// 通过别名来把原导入路径映射成一个新的导入路径
			'@': resolve('src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'eslint-loader',
					},
				],
			},
			/** rules中使用 OneOf函数可以减少loader的执行次数,只要检测到匹配的loader,就不再往下执行 */
			{
				test: /\.(js|mjs|jsx|ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							cacheDirectory: true,
							cacheCompression: false,
							presets: [
								[
									'@babel/preset-env',
									{
										modules: false,
									},
								],
								'@babel/preset-react',
							],
							plugins: [isDev ? [require.resolve('react-refresh/babel')] : []],
						},
					},
				],
			},
			{ test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
			{
				test: /\.(css|scss)$/,
				exclude: /\.module\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'], // scss=>postcss=>css =>style 从尾部开始处理
			},
			{
				test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.module\.scss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: {
								getLocalIdent: getCSSModuleLocalIdent,
							},
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: '管理后台',
			inject: true,
			template: path.resolve(__dirname, '../index.html'),
			filename: 'index.html',
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[hash].css',
		}),
		isDev && new ReactRefreshWebpackPlugin(),
		new GenerateSW({
			swDest: path.join(__dirname, 'worker/index.js'),
			maximumFileSizeToCacheInBytes: 999999999,
		}),
	],
	devtool: 'cheap-module-source-map', //生产环境不会有sourc map文件, 'source-map'值会导致生产环境有source-map文件
	// devtools 不同的值的 查阅
	cache: {
		type: 'filesystem',
		// 可选配置
		buildDependencies: {
			config: [__filename], // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
		},
		name: 'development-cache',
	},
}
