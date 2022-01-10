/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"sap/ui/fl/library"
], function (flLibrary) {
	"use strict";

	/**
	 * Change handler for changing sap.m.IconTabBar selected tab filter
	 *
	 * @alias sap.m.changeHandler.SelectIconTabBarFilter
	 * @author SAP SE
	 * @version 1.96.2
	 * @experimental Since 1.96
	 */
	var SelectIconTabBarFilter = {};

	/**
	 * Changes sap.m.IconTabBar selectedKey property
	 *
	 * @param {sap.ui.fl.Change} oChange - Change wrapper object with instructions to be applied on the control map
	 * @param {sap.m.IconTabBar} oControl - Icon Tab Bar in which the selected tab should be changed
	 * @param {object} mPropertyBag - Map of properties
	 * @param {object} mPropertyBag.modifier - Modifier for the controls
	 *
	 * @public
	 */
	SelectIconTabBarFilter.applyChange = function (oChange, oControl, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		var oChangeDefinition = oChange.getDefinition();

		oModifier.setProperty(oControl, "selectedKey", oChangeDefinition.content.selectedKey);
		oChange.setRevertData(oChangeDefinition.content.previousSelectedKey);
	};

	/**
	 * Reverts applied change
	 *
	 * @param {sap.ui.fl.Change} oChange - Change wrapper object with instructions to be applied on the control map
	 * @param {sap.m.IconTabBar} oControl - Link that matches the change selector for reverting the change
	 * @param {object} mPropertyBag - Property bag containing the modifier and the view
	 * @param {object} mPropertyBag.modifier - Modifier for the controls
	 * @public
	 */
	SelectIconTabBarFilter.revertChange = function (oChange, oControl, mPropertyBag) {
		var oModifier = mPropertyBag.modifier;
		var sPreviousSelectedKey = oChange.getRevertData();

		oModifier.setProperty(oControl, "selectedKey", sPreviousSelectedKey);
		oChange.resetRevertData();
	};

	/**
	 * Completes the change by adding change handler specific content
	 *
	 * @param {sap.ui.fl.Change} oChange - Change wrapper object to be completed
	 * @param {object} oSpecificChangeInfo - Specific info object
	 * @param {object} mPropertyBag - Map of properties
	 * @param {object} mPropertyBag.modifier - Modifier for the controls
	 *
	 * @public
	 */
	SelectIconTabBarFilter.completeChangeContent = function (oChange, oSpecificChangeInfo, mPropertyBag) {};


	/**
	 * Retrieves the condenser-specific information.
	 *
	 * @param {sap.ui.fl.Change} oChange - Change object with instructions to be applied on the control map
	 * @returns {object} - Condenser-specific information
	 * @public
	 */
	SelectIconTabBarFilter.getCondenserInfo = function (oChange) {
		return {
			affectedControl: oChange.getSelector(),
			classification: flLibrary.condenser.Classification.LastOneWins,
			uniqueKey: oChange.getContent().selectedKey
		};
	};

	return SelectIconTabBarFilter;
});