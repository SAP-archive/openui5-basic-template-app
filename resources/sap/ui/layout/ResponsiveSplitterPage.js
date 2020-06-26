/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/Core"],function(e,t,i){"use strict";var n=t.extend("sap.ui.layout.ResponsiveSplitterPage",{metadata:{library:"sap.ui.layout",associations:{content:{type:"sap.ui.core.Control",multiple:false,singularName:"content"}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t).class("sapUiResponsiveSplitterPage").openEnd();var n=i.byId(t.getAssociation("content"));if(n){e.renderControl(n)}e.close("div")}}});return n});