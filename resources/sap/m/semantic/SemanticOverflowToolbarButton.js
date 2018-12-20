/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/OverflowToolbarButton","sap/m/ButtonRenderer"],function(t,e){"use strict";var r=t.extend("sap.m.semantic.SemanticOverflowToolbarButton",{renderer:e.render});r.prototype._getTooltip=function(){var e=t.prototype._getTooltip.call(this);if(!e&&!this._bInOverflow&&this.getText()){e=this.getText()}return e};return r});