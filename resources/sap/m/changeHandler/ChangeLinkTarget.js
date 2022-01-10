/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var t={};t.applyChange=function(t,e,r){var n=r.modifier;var a=t.getDefinition();var i=a.content;return Promise.resolve().then(n.getProperty.bind(n,e,"target")).then(function(r){var a={target:r};n.setProperty(e,"target",i);t.setRevertData(a)})};t.revertChange=function(t,e,r){var n=r.modifier;var a=t.getRevertData();var i=a.target;n.setProperty(e,"target",i)};t.completeChangeContent=function(t,e,r){};return t});