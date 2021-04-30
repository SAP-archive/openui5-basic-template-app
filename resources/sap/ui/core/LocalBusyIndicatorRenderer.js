/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var n={apiVersion:2};n.render=function(n,i){n.openStart("div",i);n.class("sapUiLocalBusyIndicator");n.openEnd();a(n,i);n.close("div")};var a=function(n,a){var i=a.getId();var o=i+"-animation";var t=["-leftBox","-middleBox","-rightBox"];n.openStart("div",o);n.class("sapUiLocalBusyIndicatorAnimation");n.openEnd();for(var e=0;e<t.length;e++){n.openStart("div",i+t[e]);n.class("sapUiLocalBusyIndicatorBox");n.openEnd();n.close("div")}n.close("div")};return n},true);