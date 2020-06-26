/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBaseRenderer","sap/ui/core/Renderer","sap/ui/core/LabelEnablement","sap/ui/Device"],function(t,e,r,a){"use strict";var i=e.extend(t);i.apiVersion=2;i.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";i.writeInnerAttributes=function(t,e){t.attr("role","combobox");t.attr("aria-haspopup","listbox");t.attr("aria-autocomplete","both");t.attr("aria-expanded","false");t.attr("autocomplete","off");t.attr("autocorrect","off");t.attr("autocapitalize","off");t.attr("type","text")};i.getAriaRole=function(){};i.getAriaDescribedBy=function(e){var r=t.getAriaDescribedBy.apply(this,arguments);if(a.browser.msie){return(r||"")+" "+e.oInvisibleText.getId()}return r};i.addOuterStyles=function(t,e){t.style("max-width",e.getMaxWidth())};return i},true);