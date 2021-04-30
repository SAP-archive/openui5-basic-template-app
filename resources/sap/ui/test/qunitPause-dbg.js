/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global QUnit */
sap.ui.define("sap/ui/test/qunitPause", [
], function () {
	"use strict";

	var PAUSE_RULES = {
		NONE: "none",
		POLL: "poll"
	};
	var _pauseRule = PAUSE_RULES.NONE;
	var _bQUnitDone = false;

	function shouldPoll () {
		return _pauseRule.indexOf(PAUSE_RULES.POLL) > -1;
	}

	// checks if QUnit is done. Will call fnCallback with the result of the check.
	// iPollInterval (ms) - the time to wait before checking if QUnit is done
	function pollForQUnitDone (iPollInterval, fnCallback) {
		QUnit.begin(function () {
			_bQUnitDone = false;
		});

		var bCalled = false;
		if (!QUnit) {
			throw new Error("QUnitPause should start polling after QUnit is loaded!");
		} else if (_bQUnitDone) {
			fnCallback({
				qunitDone: true
			});
		} else if (shouldPoll()) {
			QUnit.done(function () {
				_bQUnitDone = true;
				if (!bCalled) {
					fnCallback({
						qunitDone: true
					});
				}
			});

			setTimeout(function () {
				if (!_bQUnitDone && !bCalled) {
					bCalled = true;
					fnCallback({
						qunitDone: false
					});
				}
			}, iPollInterval);
		}
	}

	function _isKnownRule (sRule) {
		var bIsKnown = false;
		for (var sKey in PAUSE_RULES) {
			if (PAUSE_RULES[sKey] === sRule) {
				bIsKnown = true;
			}
		}
		return bIsKnown;
	}

	return {
		PAUSE_RULES: PAUSE_RULES,
		get pauseRule() {
			return _pauseRule;
		},
		set pauseRule(sRules) {
			// should accept multiple rules e.g. "timeout,assert"
			var aRules = sRules.split(",");
			_pauseRule = "";
			var sNewRule = aRules.filter(_isKnownRule).join(",");
			_pauseRule = sNewRule ? sNewRule : PAUSE_RULES.NONE;
		},
		shouldPoll: shouldPoll,
		pollForQUnitDone: pollForQUnitDone
	};
}, true);
