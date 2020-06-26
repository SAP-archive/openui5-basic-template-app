/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ComboBoxBaseRenderer","./ComboBoxTextFieldRenderer","sap/ui/core/Renderer","sap/ui/core/Core"],function(e,r,t,o){"use strict";var i=t.extend(e);i.apiVersion=2;i.CSS_CLASS_MULTICOMBOBOX="sapMMultiComboBox";i.addOuterClasses=function(r,t){e.addOuterClasses.apply(this,arguments);r.class(i.CSS_CLASS_MULTICOMBOBOX);if(t._hasTokens()){r.class("sapMMultiComboBoxHasToken")}};i.getAriaDescribedBy=function(e){var t=r.getAriaDescribedBy.apply(this,arguments),o=e._oTokenizer&&e._oTokenizer.getTokensInfoId();return(t||"")+" "+o};i.getAccessibilityState=function(r){var t=e.getAccessibilityState.apply(this,arguments),i=o.getLibraryResourceBundle("sap.m");t.roledescription=i.getText("MULTICOMBOBOX_ARIA_ROLE_DESCRIPTION");return t};i.prependInnerContent=function(e,r){e.renderControl(r._oTokenizer)};return i},true);