const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: {
		"bundle": "./js/app.js",
		"bundle.min": "./js/app.js",
	},
	// devtool: "source-map",
	output: {
		path: path.join(__dirname, 'dist'),
		filename: "[name].js"
	},
	devServer: {
		inline: true,
		port: 5500 //,
		// contentBase: "dist/"
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),

		new MinifyPlugin({}, 
			{ test: /\.min\.js$/, include: /\.min\.js$/ } ),

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