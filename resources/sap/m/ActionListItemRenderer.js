/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var r=t.extend(e);r.renderLIAttributes=function(e,t){e.addClass("sapMALI")};r.renderLIContent=function(e,t){var r=t.getText();if(r){e.write("<div class='sapMALIText'>");e.writeEscaped(r);e.write("</div>")}};return r},true);