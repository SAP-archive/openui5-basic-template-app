/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/core/Element",
	"./WaiterBase"
], function(Element, WaiterBase) {
	"use strict";

	var NavigationContainerWaiter = WaiterBase.extend("sap.ui.test.autowaiter._navigationContainerWaiter", {
		hasPending: function () {
			var fnNavContainer = sap.ui.require("sap/m/NavContainer");
			// no Nav container has been loaded - continue
			if (!fnNavContainer) {
				return false;
			}
			// instanceof filter
			function isNavContainer(oControl) {
				return oControl instanceof fnNavContainer;
			}

			return Element.registry.filter(isNavContainer).some(function (oNavContainer) {
				if (oNavContainer._bNavigating) {
					this._oHasPendingLogger.debug("The NavContainer " + oNavContainer + " is currently navigating");
				}

				return oNavContainer._bNavigating;
			}.bind(this));
		}
	});

	return new NavigationContainerWaiter();
});
