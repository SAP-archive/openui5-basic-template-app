/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxTextFieldRenderer","sap/ui/core/Renderer"],function(e,s){"use strict";var a=s.extend(e);a.CSS_CLASS_COMBOBOXBASE="sapMComboBoxBase";a.getAccessibilityState=function(s){var a=e.getAccessibilityState.call(this,s);a.expanded=s.isOpen();return a};a.addOuterClasses=function(s,t){e.addOuterClasses.apply(this,arguments);var d=a.CSS_CLASS_COMBOBOXBASE;s.addClass(d);if(!t.getEnabled()){s.addClass(d+"Disabled")}if(!t.getEditable()){s.addClass(d+"Readonly")}};a.addButtonClasses=function(s,t){e.addButtonClasses.apply(this,arguments);s.addClass(a.CSS_CLASS_COMBOBOXBASE+"Arrow")};return a},true);