/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./CalendarRenderer"],function(e,a){"use strict";var n=e.extend(a);n.renderCalContentOverlay=function(){};n.renderCalContentAndArrowsOverlay=function(e,a,n){if(a.getPickerPopup()){e.write('<div id="'+n+'-contentOver" class="sapUiCalContentOver" style="display:none;"></div>')}};n.addAttributes=function(e,a){e.addClass("sapUiCalInt");e.addClass("sapUiCalDateInt");var n=a._getDays();if(n>a._getDaysLarge()){e.addClass("sapUiCalIntLarge")}if(n>a._iDaysMonthHead){e.addClass("sapUiCalIntHead")}};return n},true);