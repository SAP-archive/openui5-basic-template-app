/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","./ComboBoxTextFieldRenderer","sap/ui/core/Renderer","sap/ui/Device"],function(e,i,r,t){"use strict";var s=r.extend(e);s.CSS_CLASS_MULTICOMBOBOX="sapMMultiComboBox";s.addOuterClasses=function(i,r){e.addOuterClasses.apply(this,arguments);i.addClass(s.CSS_CLASS_MULTICOMBOBOX);if(r._hasTokens()){i.addClass("sapMMultiComboBoxHasToken")}};s.getAccessibilityState=function(e){var r=i.getAccessibilityState.call(this,e),s=e._oTokenizer&&e._oTokenizer.getTokensInfoId();r.expanded=e.isOpen();if(sap.ui.getCore().getConfiguration().getAccessibility()){if(t.browser.internet_explorer&&r.describedby){r.describedby={value:(r.describedby+" "+s).trim(),append:true}}else{r.describedby={value:s.trim(),append:true}}}return r};s.prependInnerContent=function(e,i){e.renderControl(i._oTokenizer)};return s},true);