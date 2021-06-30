const path = require("path");
const fs = require("fs");
const { override, addWebpackPlugin } = require("customize-cra");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const addMomentLocalesPlugin = (config) => {
	config.plugins.push(new MomentLocalesPlugin());
	return config;
};

const addHtmlWebpackInlineSourcePlugin = (config) => {
	config.plugins.shift();

	config.plugins.unshift(new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin));

	config.plugins.unshift(
		new HtmlWebpackPlugin({
			inject: true,
			template: resolveApp("public/index.html"),
			inlineSource: ".(js|css)$",
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		})
	);

	return config;
};

module.exports = { webpack: override(addHtmlWebpackInlineSourcePlugin) };
