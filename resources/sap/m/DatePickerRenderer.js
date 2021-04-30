/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer","sap/ui/core/library"],function(e,t,a){"use strict";var r=e.extend(t);r.apiVersion=2;r.writeInnerValue=function(e,t){if(t._bValid){e.attr("value",t._formatValue(t.getDateValue()))}else{e.attr("value",t.getValue())}};r.writeInnerAttributes=function(e,t){e.attr("type","text");if(t._bMobile){e.attr("readonly","readonly")}};r.getAriaRole=function(e){return"combobox"};r.getAccessibilityState=function(e){var r=t.getAccessibilityState.apply(this,arguments);r["roledescription"]=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATEINPUT");r["autocomplete"]="none";r["haspopup"]=a.aria.HasPopup.Grid.toLowerCase();r["expanded"]=false;r["disabled"]=null;if(e._bMobile&&e.getEnabled()&&e.getEditable()){r["readonly"]=false}return r};return r},true);