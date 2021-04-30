/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","./ToolbarSpacerRenderer","sap/base/Log"],function(a,t,e,r){"use strict";var o=t.extend("sap.m.ToolbarSpacer",{metadata:{library:"sap.m",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:""}}}});o.prototype.setLayoutData=function(a){if(a&&a.isA("sap.m.ToolbarLayoutData")){r.warning("sap.m.ToolbarLayoutData should not be set in the layoutData aggregation of sap.m.ToolbarSpacer");return this}return this.setAggregation("layoutData",a)};return o});