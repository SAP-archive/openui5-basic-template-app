/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TreeItemBaseRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var r=t.extend(e);r.renderLIContent=function(e,t){if(t.getIcon()){e.renderControl(t._getIconControl())}e.writeEscaped(t.getTitle())};r.renderLIAttributes=function(t,r){e.renderLIAttributes.apply(this,arguments);t.addClass("sapMSTI")};r.getAriaLabelledBy=function(e){return e.getId()+"-content"};return r},true);