/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};e.render=function(e,i){var t,n;e.openStart("div",i);e.attr("tabindex","0");e.class("sapMTile");e.class("sapMPointer");if(i._invisible){e.style("visibility","hidden")}var s=i.getTooltip_AsString();if(s){e.attr("title",s)}if(i.getParent()instanceof sap.m.TileContainer){t=i.getParent();n=t._getVisibleTiles();e.accessibilityState(i,{role:"option",posinset:t._indexOfVisibleTile(i,n)+1,setsize:n.length})}e.openEnd();e.openStart("div",i.getId()+"-remove");e.class(i.getRemovable()?"sapMTCRemove":"sapMTCNoRemove");e.openEnd().close("div");e.openStart("div").class("sapMTileContent").openEnd();this._renderContent(e,i);e.close("div").close("div")};e._renderContent=function(e,i){};return e},true);