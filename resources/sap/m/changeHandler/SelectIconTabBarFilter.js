/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/library"],function(e){"use strict";var t={};t.applyChange=function(e,t,n){var r=n.modifier;var i=e.getDefinition();r.setProperty(t,"selectedKey",i.content.selectedKey);e.setRevertData(i.content.previousSelectedKey)};t.revertChange=function(e,t,n){var r=n.modifier;var i=e.getRevertData();r.setProperty(t,"selectedKey",i);e.resetRevertData()};t.completeChangeContent=function(e,t,n){};t.getCondenserInfo=function(t){return{affectedControl:t.getSelector(),classification:e.condenser.Classification.LastOneWins,uniqueKey:t.getContent().selectedKey}};return t});