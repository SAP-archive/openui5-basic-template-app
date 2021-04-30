/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Renderer","./ToolbarRenderer","sap/m/BarInPageEnabler"],function(e,r,n,o){"use strict";var t=e.OverflowToolbarPriority;var l=r.extend(n);l.apiVersion=2;l.renderBarContent=function(e,r){var n=false,i;r._getVisibleContent().forEach(function(l){o.addChildClassTo(l,r);if(r._getControlPriority(l)!==t.AlwaysOverflow){e.renderControl(l)}else{n=n||l.getVisible()}});if(n||r._getOverflowButtonNeeded()){l.renderOverflowButton(e,r)}i=r.getContent().some(function(e){return e.getVisible()});if(i){l.renderOverflowButtonClone(e,r)}};l.renderOverflowButton=function(e,r){var n=r._getOverflowButton();o.addChildClassTo(n,r);e.renderControl(n)};l.renderOverflowButtonClone=function(e,r){var n=r._getOverflowButtonClone();o.addChildClassTo(n,r);e.renderControl(n)};return l},true);