/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextFieldRenderer","sap/ui/core/Renderer","sap/ui/core/Core"],function(e,s,t){"use strict";var a=s.extend(e);a.apiVersion=2;a.CSS_CLASS_COMBOBOXBASE="sapMComboBoxBase";a.getAccessibilityState=function(s){var t=e.getAccessibilityState.call(this,s),a=s._getList();if(a){t.controls=a.getId()}return t};a.addOuterClasses=function(s,t){e.addOuterClasses.apply(this,arguments);var i=a.CSS_CLASS_COMBOBOXBASE;s.class(i);if(!t.getEnabled()){s.class(i+"Disabled")}if(!t.getEditable()){s.class(i+"Readonly")}};a.addButtonClasses=function(s,t){e.addButtonClasses.apply(this,arguments);s.class(a.CSS_CLASS_COMBOBOXBASE+"Arrow")};return a},true);