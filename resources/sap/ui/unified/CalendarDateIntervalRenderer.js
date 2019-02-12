/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./CalendarRenderer"],function(e,a){"use strict";var t=e.extend(a);t.renderCalContentOverlay=function(){};t.renderCalContentAndArrowsOverlay=function(e,a,t){if(a.getPickerPopup()){e.write('<div id="'+t+'-contentOver" class="sapUiCalContentOver"');if(!a._oPopup||!a._oPopup.isOpen()){e.write('style="display:none;"')}e.write(">");e.write("</div>")}};t.addAttributes=function(e,a){e.addClass("sapUiCalInt");e.addClass("sapUiCalDateInt");var t=a._getDays();if(t>a._getDaysLarge()){e.addClass("sapUiCalIntLarge")}if(t>a._iDaysMonthHead){e.addClass("sapUiCalIntHead")}};return t},true);