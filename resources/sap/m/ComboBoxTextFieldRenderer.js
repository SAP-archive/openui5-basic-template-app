/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./InputBaseRenderer","sap/ui/core/Renderer","sap/ui/core/LabelEnablement","sap/ui/Device"],function(t,e,a,r){"use strict";var o=e.extend(t);o.apiVersion=2;o.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";o.writeInnerAttributes=function(t,e){t.attr("role","combobox");t.attr("aria-haspopup","listbox");t.attr("aria-autocomplete","both");t.attr("aria-expanded","false");t.attr("autocomplete","off");t.attr("autocorrect","off");t.attr("autocapitalize","off");t.attr("type","text")};o.getAriaRole=function(){};o.addOuterStyles=function(t,e){t.style("max-width",e.getMaxWidth())};return o},true);