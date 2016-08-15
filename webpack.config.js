const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
	progress: true,
	colors: true,
	devtool: 'eval-cheap-module-source-map',
	entry: './src/client/main.js',
	output: {
		path: 'public',
		filename: 'bundle.js',
	},
	resolve: {
		extensions: ['', '.js'],
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['es2015'],
			},
		}, {
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass'],
		}],
	},
	plugins: [
		new LiveReloadPlugin({
			appendScriptTag: true,
		}),
	],
};