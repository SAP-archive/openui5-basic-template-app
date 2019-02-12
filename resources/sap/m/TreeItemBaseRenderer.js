/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBaseRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var r=t.extend(e);r.renderLIAttributes=function(e,t){e.addClass("sapMTreeItemBase");if(!t.isTopLevel()){e.addClass("sapMTreeItemBaseChildren")}if(t.isLeaf()){e.addClass("sapMTreeItemBaseLeaf")}var r=t._getPadding();if(sap.ui.getCore().getConfiguration().getRTL()){e.addStyle("padding-right",r+"rem")}else{e.addStyle("padding-left",r+"rem")}};r.renderContentFormer=function(e,t){this.renderHighlight(e,t);this.renderExpander(e,t);this.renderMode(e,t,-1)};r.renderExpander=function(e,t){var r=t._getExpanderControl();if(r){e.renderControl(r)}};r.getAriaRole=function(e){return"treeitem"};r.getAccessibilityState=function(t){var r=e.getAccessibilityState.call(this,t);r.level=t.getLevel()+1;if(!t.isLeaf()){r.expanded=t.getExpanded()}return r};return r},true);