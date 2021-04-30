/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Renderer', './DatePickerRenderer', './InputBaseRenderer', 'sap/ui/core/library'],
	function(Renderer, DatePickerRenderer, InputBaseRenderer, coreLibrary) {
	"use strict";

	/**
	 * DateTimePicker renderer.
	 * @namespace
	 */
	var DateTimePickerRenderer = Renderer.extend(DatePickerRenderer);

	DateTimePickerRenderer.apiVersion = 2;

	DateTimePickerRenderer.getDescribedByAnnouncement = function(oDP) {

		var sBaseAnnouncement = InputBaseRenderer.getDescribedByAnnouncement.apply(this, arguments);
		return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("DATETIMEPICKER_TYPE") + " " + sBaseAnnouncement;

	};

	DateTimePickerRenderer.getAccessibilityState = function(oDP) {
		var mAccessibilityState = DatePickerRenderer.getAccessibilityState.apply(this, arguments);

		mAccessibilityState["haspopup"] = coreLibrary.aria.HasPopup.Dialog.toLowerCase();

		return mAccessibilityState;
	};

	return DateTimePickerRenderer;

}, /* bExport= */ true);
