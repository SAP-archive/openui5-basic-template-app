/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/OverflowToolbarToggleButton","sap/m/ToggleButtonRenderer"],function(t,e){"use strict";var r=t.extend("sap.m.semantic.SemanticOverflowToolbarButton",{metadata:{library:"sap.m"},renderer:e.render});r.prototype._getTooltip=function(){var e=t.prototype._getTooltip.call(this);if(!e&&!this._bInOverflow&&this.getText()){e=this.getText()}return e};return r});