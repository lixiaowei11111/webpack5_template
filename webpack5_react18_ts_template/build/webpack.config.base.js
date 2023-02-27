//  config/webpack.config.base.js
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const { log } = require('console')
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
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/index.tsx',
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
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。
    alias: {
      // 通过别名来把原导入路径映射成一个新的导入路径
      '@': resolve('src'),
    },
  },
  module: {
    rules: [
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
              plugins: [isDev && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      { test: /\.(ts|tsx)$/, loader: 'ts-loader', exclude: /node_modules/ },
      {
        test: /\.(css|scss)$/,
        exclude: /\.module\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
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
      title: '金财管理后台',
      template: path.resolve(__dirname, '../index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
    }),
    isDev && new ReactRefreshWebpackPlugin(),
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
