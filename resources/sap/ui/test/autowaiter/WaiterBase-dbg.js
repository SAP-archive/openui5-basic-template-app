/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/test/_OpaLogger",
	"sap/ui/test/_ParameterValidator",
	"sap/ui/thirdparty/jquery"
], function (UI5Object, _OpaLogger, _ParameterValidator, jQueryDOM) {
	"use strict";

	var WaiterBase = UI5Object.extend("sap.ui.test.autowaiter.WaiterBase", {
		constructor: function () {
			this._mConfig = this._getDefaultConfig();
			this._sName = this.getMetadata().getName();
			this._oLogger = _OpaLogger.getLogger(this._sName);
			this._oHasPendingLogger = _OpaLogger.getLogger(this._sName + "#hasPending");
			this._oConfigValidator = new _ParameterValidator({
				errorPrefix: this._sName + "#extendConfig"
			});
		},
		hasPending: function () {
			return false;
		},
		isEnabled: function () {
			return this._mConfig.enabled;
		},
		extendConfig: function (oConfig) {
			if (!jQueryDOM.isEmptyObject(oConfig)) {
				this._oConfigValidator.validate({
					inputToValidate: oConfig,
					validationInfo: this._getValidationInfo()
				});
				jQueryDOM.extend(this._mConfig, oConfig);
			}
		},
		_getDefaultConfig: function () {
			return {
				enabled: true
			};
		},
		_getValidationInfo: function () {
			return {
				enabled: "bool"
			};
		}
	});

	return WaiterBase;
});
