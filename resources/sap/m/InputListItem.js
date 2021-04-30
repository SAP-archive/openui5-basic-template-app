/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","./library","./ListItemBase","./InputListItemRenderer"],function(e,t,i,n){"use strict";var r=e.TextDirection;var a=i.extend("sap.m.InputListItem",{metadata:{library:"sap.m",properties:{label:{type:"string",group:"Misc",defaultValue:null},labelTextDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:r.Inherit}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content",bindable:"bindable"}},designtime:"sap/m/designtime/InputListItem.designtime"}});a.prototype.getContentAnnouncement=function(){var e=this.getLabel()+" . ";this.getContent().forEach(function(t){e+=i.getAccessibilityText(t)+" "});return e.trim()};return a});