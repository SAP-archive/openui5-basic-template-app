/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer"],function(e,r){"use strict";var n=r.extend(e);n.renderLIAttributes=function(e,r){e.addClass("sapMCLI")};n.renderLIContent=function(e,r){var n=r.getContent();var t=n.length;for(var a=0;a<t;a++){e.renderControl(n[a])}};return n},true);