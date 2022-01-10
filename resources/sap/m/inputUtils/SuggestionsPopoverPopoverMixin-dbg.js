/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 * IMPORTANT: This is a private module, its API must not be used and is subject to change.
 * Code other than the OpenUI5 libraries must not introduce dependencies to this module.
 */
sap.ui.define([
	"sap/m/library",
	"sap/m/Popover",
	"sap/m/ValueStateHeader"
], function (library, Popover, ValueStateHeader) {
	"use strict";

	// shortcut for sap.m.PlacementType
	var PlacementType = library.PlacementType;

	return function () {
		/**
		 * Instrantiates the Popover
		 *
		 * @override
		 * @param oInput
		 * @returns {sap.m.Popover}
		 */
		this.createPopover = function (oInput) {
			var that = this,
				oPopover = new Popover(oInput.getId() + "-popup", {
					showArrow: false,
					placement: PlacementType.VerticalPreferredBottom,
					showHeader: true,
					initialFocus: oInput,
					horizontalScrolling: true,
					beforeClose: function () {
						// If the popover is closed while the pseudo focus is on value state header containing links
						if (that.getValueStateActiveState()) {
							that._getValueStateHeader().removeStyleClass("sapMPseudoFocus");
							that.setValueStateActiveState(false);
						}
					}
				});

			return _patchPopover(oPopover, oInput);
		};

		/**
		 * Resizes the popup to the input width and makes sure that the input is never bigger than the popup.
		 *
		 * @override
		 * @public
		 */
		this.resizePopup = function (oInput) {
			var oPopover = this.getPopover();

			if (this.getItemsContainer() && oPopover) {

				if (this._sPopoverContentWidth) {
					oPopover.setContentWidth(this._sPopoverContentWidth);
				} else {
					oPopover.setContentWidth((oInput.$().outerWidth()) + "px");
				}

				// resize suggestion popup to minimum size of the input field
				setTimeout(function () {
					if (oPopover && oPopover.isOpen() && oPopover.$().outerWidth() < oInput.$().outerWidth()) {
						oPopover.setContentWidth((oInput.$().outerWidth()) + "px");
					}
				}, 0);
			}
		};

		/**
		 * Gets Show More button from <code>SuggestionsPopover</code>'s Popover.
		 *
		 * @return {sap.m.Button} Show more button.
		 * @public
		 */
		this.getShowMoreButton = function() {
			return this.getPopover() && this.getPopover().getFooter() && this.getPopover().getFooter().getContent()[1];
		};

		/**
		 * Sets Show More button to <code>SuggestionsPopover</code>'s Popover.
		 *
	 	 * @param {sap.m.Toolbar} oButtonToolbar The "Show More" button toolbar for the Popover's <code>footer</code> aggregation
		 * @public
		 */
		this.setShowMoreButton = function(oButtonToolbar) {
			this.getPopover().setFooter(oButtonToolbar);
			return this;
		};

		/**
		 * Destroys Show More button from <code>SuggestionsPopover</code>'s Popover.
		 *
		 * @public
		 */
		this.removeShowMoreButton = function() {
			this.getPopover().destroyAggregation("footer");
			return this;
		};

		/**
		 * Helper function that overwrites popover in the Input.
		 */
		function _patchPopover(oPopover, oInput) {
			oPopover.open = function () {
				this.openBy(oInput, false, true);
			};

			// remove animation from popover
			oPopover.oPopup.setAnimations(function ($Ref, iRealDuration, fnOpened) {
				fnOpened();
			}, function ($Ref, iRealDuration, fnClosed) {
				fnClosed();
			});

			return oPopover;
		}

		/**
		 * Gets the Value State Header instance.
		 *
		 * @private
		 */
		this._getValueStateHeader = function () {
			var oPopover = this.getPopover();
			var oValueStateHeader = oPopover && oPopover.getCustomHeader();

			if (oPopover && !oValueStateHeader) {
				oValueStateHeader = this._createValueStateHeader();
			}

			return oValueStateHeader;
		};

		/**
		 * Creates the Value State Header instance.
		 *
		 * @private
		 */
		this._createValueStateHeader = function () {
			var oValueStateHeader = new ValueStateHeader();
			var	oPopover = this.getPopover();

			// when we are using the Popover the value state header is shown in the header of the Popover
			oPopover.setCustomHeader(oValueStateHeader);
			oValueStateHeader.setPopup(oPopover);

			return oValueStateHeader;
		};
	};
});