/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var a=e._getInput(),d=e.getWidth(),i=e.getEnabled(),r=e.getEditable();t.write("<div ");if(i&&r){t.write("tabindex='-1'")}t.addStyle("width",d);t.writeStyles();t.writeControlData(e);t.addClass("sapMStepInput");t.addClass("sapMStepInput-CTX");!i&&t.addClass("sapMStepInputReadOnly");!r&&t.addClass("sapMStepInputNotEditable");t.writeClasses();t.write(">");t.renderControl(a);t.write("</div>")};return t},true);