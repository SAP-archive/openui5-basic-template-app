/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","./library","./VerticalLayoutRenderer"],function(t,e,i,o){"use strict";var r=t.extend("sap.ui.layout.VerticalLayout",{metadata:{library:"sap.ui.layout",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},designtime:"sap/ui/layout/designtime/VerticalLayout.designtime"}});r.prototype.setWidth=function(t){this.setProperty("width",t,true);if(this.getDomRef()){this.getDomRef().style.width=this.getWidth()}return this};r.prototype.getAccessibilityInfo=function(){return{children:this.getContent()}};e.call(r.prototype);return r});