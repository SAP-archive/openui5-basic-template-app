/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBaseRenderer","sap/ui/core/Renderer","sap/ui/core/LabelEnablement","sap/ui/Device"],function(t,e,i,r){"use strict";var o=e.extend(t);o.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";o.writeInnerAttributes=function(t,e){t.writeAttribute("autocomplete","off");t.writeAttribute("autocorrect","off");t.writeAttribute("autocapitalize","off");t.writeAttribute("type","text")};o.writeOuterAttributes=function(t,e){if(sap.ui.getCore().getConfiguration().getAccessibility()){t.writeAttribute("role","combobox")}};o.getAriaRole=function(){};o.getAccessibilityState=function(e){var i=t.getAccessibilityState.call(this,e);i.autocomplete="both";if(r.browser.internet_explorer){i.describedby=e.oInvisibleText.getId()}return i};o.addOuterStyles=function(t,e){t.addStyle("max-width",e.getMaxWidth())};return o},true);