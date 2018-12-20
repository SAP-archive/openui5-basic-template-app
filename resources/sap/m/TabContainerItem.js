/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(e){"use strict";var t=e.extend("sap.m.TabContainerItem",{metadata:{library:"sap.ui.core",properties:{name:{type:"string",group:"Misc",defaultValue:""},key:{type:"string",group:"Data",defaultValue:null},modified:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{content:{type:"sap.ui.core.Control",multiple:true,defaultValue:null}},events:{itemPropertyChanged:{parameters:{itemChanged:{type:"sap.m.TabContainerItem"},propertyKey:{type:"string"},propertyValue:{type:"any"}}}}}});t.prototype.setProperty=function(t,r,a){if(t==="modified"){a=true}this.fireItemPropertyChanged({itemChanged:this,propertyKey:t,propertyValue:r});return e.prototype.setProperty.call(this,t,r,a)};return t});