/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var a=e._getInput(),i=e.getWidth(),d=e.getEnabled(),s=e.getEditable();t.write("<div ");if(d&&s){t.write("tabindex='-1'")}t.addStyle("width",i);t.writeStyles();t.writeControlData(e);t.writeAccessibilityState(e);t.addClass("sapMStepInput");t.addClass("sapMStepInput-CTX");!d&&t.addClass("sapMStepInputReadOnly");!s&&t.addClass("sapMStepInputNotEditable");t.writeClasses();t.write(">");t.renderControl(a);t.write("</div>")};return t},true);