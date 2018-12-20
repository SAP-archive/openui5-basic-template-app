/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./MaskEnabler","./MaskInputRenderer"],function(e,t,a){"use strict";var r=e.extend("sap.m.MaskInput",{metadata:{library:"sap.m",properties:{placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"}}}});t.call(r.prototype);r.prototype._isMaskEnabled=function(){return true};return r});