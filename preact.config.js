const netlifyPlugin = require('preact-cli-plugin-netlify');

export default (config, env, helpers) => {
	config.output.publicPath = '/iostaging/';
	netlifyPlugin(config);

	config.plugins.push(
		new helpers.webpack.DefinePlugin({
			'process.env.PUBLIC_PATH': JSON.stringify(config.output.publicPath || '/')
		})
	);
};