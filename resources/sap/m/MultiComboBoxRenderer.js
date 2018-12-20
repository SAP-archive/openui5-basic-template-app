/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var n=t.extend(e);n.CSS_CLASS_MULTICOMBOBOX="sapMMultiComboBox";n.addOuterClasses=function(t,r){e.addOuterClasses.apply(this,arguments);t.addClass(n.CSS_CLASS_MULTICOMBOBOX);if(r._hasTokens()){t.addClass("sapMMultiComboBoxHasToken")}};n.writeInnerAttributes=function(t,n){if(sap.ui.getCore().getConfiguration().getAccessibility()){var r=n._oTokenizer&&n._oTokenizer.getTokensInfoId();t.writeAttribute("aria-describedby",r)}e.writeInnerAttributes.apply(this,arguments)};n.prependInnerContent=function(e,t){e.renderControl(t._oTokenizer)};return n},true);