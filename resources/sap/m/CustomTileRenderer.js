/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TileRenderer","sap/ui/core/Renderer"],function(e,n){"use strict";var t=n.extend(e);t.apiVersion=2;t.render=function(e,n){var t,i;e.openStart("div",n).attr("tabindex","0");e.class("sapMCustomTile");if(n._invisible){e.style("visibility","hidden")}if(n.getParent()instanceof sap.m.TileContainer){t=n.getParent();i=t._getVisibleTiles();e.accessibilityState(n,{role:"option",posinset:t._indexOfVisibleTile(n,i)+1,setsize:i.length})}e.openEnd();e.openStart("div",n.getId()+"-remove").class("sapMTCRemove").openEnd().close("div");e.openStart("div").class("sapMCustomTileContent").openEnd();this._renderContent(e,n);e.close("div").close("div")};t._renderContent=function(e,n){e.renderControl(n.getContent())};return t},true);