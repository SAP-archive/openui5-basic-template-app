/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBaseRenderer","sap/ui/core/Renderer","sap/ui/core/LabelEnablement"],function(t,e,i){"use strict";var r=e.extend(t);r.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";r.writeInnerAttributes=function(t,e){t.writeAttribute("autocomplete","off");t.writeAttribute("autocorrect","off");t.writeAttribute("autocapitalize","off");t.writeAttribute("type","text")};r.writeOuterAttributes=function(t,e){if(sap.ui.getCore().getConfiguration().getAccessibility()){t.writeAttribute("role","combobox")}};r.getAriaRole=function(){};r.getAccessibilityState=function(e){var i=t.getAccessibilityState.call(this,e);i.autocomplete="both";return i};r.addOuterStyles=function(t,e){t.addStyle("max-width",e.getMaxWidth())};return r},true);