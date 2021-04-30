/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer","sap/ui/core/library"],function(e,t,a){"use strict";var n=e.extend(t);n.apiVersion=2;n.CSS_CLASS="sapMTimePicker";n.addOuterClasses=function(e,t){e.class(n.CSS_CLASS)};n.writeInnerValue=function(e,t){e.attr("value",t._formatValue(t.getDateValue()))};n.getAriaRole=function(){return"combobox"};n.getLabelledByAnnouncement=function(e){return e._getPlaceholder()||""};n.getAccessibilityState=function(e){var n=t.getAccessibilityState.apply(this,arguments);n["roledescription"]=e._oResourceBundle.getText("ACC_CTR_TYPE_TIMEINPUT");n["autocomplete"]="none";n["haspopup"]=a.aria.HasPopup.Dialog.toLowerCase();n["expanded"]=false;n["disabled"]=null;n["owns"]=e.getId()+"-sliders";return n};return n},true);