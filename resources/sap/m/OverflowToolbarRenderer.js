/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./ToolbarRenderer"],function(e,r){"use strict";var n=e.extend(r);n.renderBarContent=function(e,r){r._getVisibleContent().forEach(function(n){sap.m.BarInPageEnabler.addChildClassTo(n,r);e.renderControl(n)});if(r._getOverflowButtonNeeded()){n.renderOverflowButton(e,r)}};n.renderOverflowButton=function(e,r){var n=r._getOverflowButton();sap.m.BarInPageEnabler.addChildClassTo(n,r);e.renderControl(n)};return n},true);