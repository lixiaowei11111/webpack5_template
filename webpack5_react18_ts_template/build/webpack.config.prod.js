const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
/**
 * @type {import('webpack').WebpackOptionsNormalized}
 */

const prodConfig = {
	mode: process.env.NODE_ENV,
}

module.exports = webpackMerge.merge(baseConfig, prodConfig)
