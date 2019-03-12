const preactCliSwPrecachePlugin = require('preact-cli-sw-precache');
// const netlifyPlugin = require('preact-cli-plugin-netlify');

export default (config, env, helpers) => {

	config.output.publicPath = env.production ? '/io/' : '/';
	config.plugins.push(
		new helpers.webpack.DefinePlugin({
			'process.env.PUBLIC_PATH': JSON.stringify(config.output.publicPath || '/')
		})
	);

	const precacheConfig = {
		filename: 'sw.js',
		navigateFallback: 'index.html',
		navigateFallbackWhitelist: [/^(?!\/__).*/],
		minify: true,
		stripPrefix: config.cwd,
		staticFileGlobsIgnorePatterns: [
			/polyfills(\..*)?\.js$/,
			/\.map$/,
			/push-manifest\.json$/,
			/.DS_Store/,
			/\.git/
		],
		runtimeCaching: [
			{
				urlPattern: /^https:\/\/res\.cloudinary\.com\//,
				handler: 'fastest',
				options: {
					cache: {
						maxEntries: 200,
						name: 'items-cache'
					}
				}
			}
		]
	};

	// netlifyPlugin(config);

	return preactCliSwPrecachePlugin(config, precacheConfig);
};