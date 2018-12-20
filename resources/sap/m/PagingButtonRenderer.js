/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var r=e._getNextButton(),n=e._getPreviousButton();t.write("<div");t.writeControlData(e);t.addClass("sapMPagingButton");t.writeClasses();t.write(">");t.renderControl(n);t.renderControl(r);t.write("</div>")};return t},true);