/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var n={apiVersion:2};n.render=function(n,e){n.openStart("span",e);n.class("sapMObjectMarker");n.openEnd();n.renderControl(e._getInnerControl());n.close("span")};return n},true);