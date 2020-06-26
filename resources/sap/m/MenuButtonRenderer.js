/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.CSS_CLASS="sapMMenuBtn";e.render=function(t,n){var r=n.getWidth();t.openStart("div",n);t.class(e.CSS_CLASS).class(e.CSS_CLASS+n.getButtonMode());if(r!=""){t.style("width",r)}t.openEnd();n._ensureBackwardsReference();t.renderControl(n._getButtonControl());t.close("div")};return e},true);