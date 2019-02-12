/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","./InputBaseRenderer"],function(e,t){"use strict";var n=e.extend(t);n.getLabelledByAnnouncement=function(e){var n=e.getMask(),r=e.getPlaceholder()||"",u=e.getTooltip_AsString()||"",i,a,g="";if(n&&n.length){i=sap.ui.getCore().getLibraryResourceBundle("sap.m");a=i.getText("MASKINPUT_SCREENREADER_TAG");if(u){u=" "+u+" "}if(r){r=" "+r+" "}g=a+r+u;return g}return t.getLabelledByAnnouncement.apply(this,arguments)};n.getDescribedByAnnouncement=function(e){var n=e.getMask(),r=e.getPlaceholderSymbol(),u,i="";if(n.length&&r){u=sap.ui.getCore().getLibraryResourceBundle("sap.m");i=u.getText("MASKINPUT_SCREENREADER_DESCRIPTION",[r,n]);return jQuery.trim(i)}return t.getDescribedByAnnouncement.apply(this,arguments)};return n},true);