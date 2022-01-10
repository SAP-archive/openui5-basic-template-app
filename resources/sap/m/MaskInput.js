/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBase","./MaskEnabler","./MaskInputRenderer"],function(e,a,t){"use strict";var l=e.extend("sap.m.MaskInput",{metadata:{library:"sap.m",properties:{placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null},showClearIcon:{type:"boolean",defaultValue:false},effectiveShowClearIcon:{type:"boolean",defaultValue:false,visibility:"hidden"}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"}},dnd:{draggable:false,droppable:true}}});a.call(l.prototype);l.prototype._isMaskEnabled=function(){return true};return l});