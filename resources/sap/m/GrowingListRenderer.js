/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListRenderer","sap/ui/core/Renderer","sap/base/Log"],function(e,r,i){"use strict";var n=r.extend(e);n.render=function(r,n){if(n._isIncompatible()){i.warning("Does not render sap.m.GrowingList#"+n.getId()+" when compatibility version is 1.16 or higher. Instead use sap.m.List/Table control with growing feature!")}else{e.render.call(this,r,n)}};return n},true);