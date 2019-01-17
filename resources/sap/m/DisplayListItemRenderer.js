/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/Renderer","./ListItemBaseRenderer"],function(e,t,r){"use strict";var i=e.TextDirection;var a=t.extend(r);a.renderLIAttributes=function(e,t){e.addClass("sapMDLI")};a.renderLIContent=function(e,t){var r=t.getLabel();if(r){e.write("<label for='"+t.getId()+"-value' class='sapMDLILabel'>");e.writeEscaped(t.getLabel());e.write("</label>")}var a=t.getValue();var s=t.getValueTextDirection();if(a){e.write("<div id='"+t.getId()+"-value' class='sapMDLIValue'");if(s!=i.Inherit){e.writeAttribute("dir",s.toLowerCase())}e.write(">");e.writeEscaped(t.getValue());e.write("</div>")}};return a},true);