/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/LayoutData","./library"],function(e,a){"use strict";var t=e.extend("sap.ui.layout.SplitterLayoutData",{metadata:{library:"sap.ui.layout",properties:{resizable:{type:"boolean",group:"Behavior",defaultValue:true},size:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},minSize:{type:"int",group:"Dimension",defaultValue:0}}}});return t});