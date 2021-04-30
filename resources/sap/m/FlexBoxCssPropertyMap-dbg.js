/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],
	function() {
	"use strict";

	var FlexBoxCssPropertyMap = {
		'specie10': {
			'order': {
				'<number>': {
					'flex-order': '<number>'
				}
			},
			'flex-grow': {
				'<number>': {
					'flex-positive': '<number>',
					'flex-preferred-size': 'auto'
				}
			},
			'flex-shrink': {
				'<number>': {
					'flex-negative': '<number>'
				}
			},
			'flex-basis': {
				'<number>': {
					'flex-preferred-size': '<number>'
				}
			}
		}
	};

	return FlexBoxCssPropertyMap;

}, /* bExport= */ true);
