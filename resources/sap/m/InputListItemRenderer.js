/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Renderer","./ListItemBaseRenderer"],function(e,r,t){"use strict";var i=e.TextDirection;var a=r.extend(t);a.renderLIAttributes=function(e,r){e.addClass("sapMILI")};a.renderLIContent=function(e,r){var t=r.getLabel();if(t){var a=r.getId()+"-label",n=r.getLabelTextDirection();e.write('<span id="'+a+'" class="sapMILILabel"');if(n!==i.Inherit){e.writeAttribute("dir",n.toLowerCase())}e.write(">");e.writeEscaped(t);e.write("</span>")}e.write('<div class="sapMILIDiv sapMILI-CTX">');r.getContent().forEach(function(r){if(a&&r.addAriaLabelledBy&&r.getAriaLabelledBy().indexOf(a)==-1){r.addAssociation("ariaLabelledBy",a,true)}e.renderControl(r)});e.write("</div>")};return a},true);