const webpack = require("webpack");
// const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		"bundle": "./js/app.js",
		// "bundle.min": "./js/app.js",
	},
	devtool: "source-map",
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].js"
	},
	devServer: {
		inline: true,
		port: 5500 //,
		// contentBase: "dist/"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: [
						['es2015', { modules: false }]
					]
				}
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: { comments: false },
			sourceMap: true
		}),

		// new MinifyPlugin({}, 
			// { sourceMap: true }), // { test: /\.min\.js$/, include: /\.min\.js$/, 

		new CopyWebpackPlugin([
			{ from: 'vendor', to: 'vendor' },
			{ from: 'css', to: 'css' },
			{ from: 'img', to: 'img' }
		])
	]
	// module: {
	// 	loaders: []
	// }	
};