/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(t){"use strict";var e=t.extend("sap.m.p13n.AbstractContainerItem",{metadata:{library:"sap.m",defaultAggregation:"content",properties:{key:{type:"string",defaultValue:null},text:{type:"string",defaultValue:null},icon:{type:"string",defaultValue:null}},aggregations:{content:{type:"sap.ui.core.Control",multiple:false}}}});e.prototype.setContent=function(t){this.setAggregation("content",t);if(t){this._oContent=t}return this};e.prototype.getContent=function(){return this._oContent};e.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);if(this._oContent){this._oContent.destroy();this._oContent=null}};return e});