/* global module require*/

module.exports = function(config) {
	"use strict";

	require("./karma.conf")(config);

	config.set({

		preprocessors: {
			'{,!(test)}/*.js': ['coverage']
		},

		coverageReporter: {
			includeAllSources: true,
			reporters: [
				{
					type: 'html',
					dir: '../coverage/'
				},
				{
					type: 'text'
				}
			],
			check: {
				global: {
					statements: 80,
					branches: 80,
					functions: 70,
					lines: 80
				}
			}
		},

		client: {
			qunit: {
				showUI: false
			}
		},

		reporters: ['progress', 'coverage'],

		browsers: ['Chrome'],

		singleRun: true
	});
};