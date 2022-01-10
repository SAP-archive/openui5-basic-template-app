/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(I){"use strict";var t=I.IndicationColor;var T={};var e=null;var i=function(){if(!e){e={};var I=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core");e[t.Indication01]=I.getText("INDICATION_STATE_INDICATION01");e[t.Indication02]=I.getText("INDICATION_STATE_INDICATION02");e[t.Indication03]=I.getText("INDICATION_STATE_INDICATION03");e[t.Indication04]=I.getText("INDICATION_STATE_INDICATION04");e[t.Indication05]=I.getText("INDICATION_STATE_INDICATION05");e[t.Indication06]=I.getText("INDICATION_STATE_INDICATION06");e[t.Indication07]=I.getText("INDICATION_STATE_INDICATION07");e[t.Indication08]=I.getText("INDICATION_STATE_INDICATION08")}};T.getAdditionalText=function(I){var T=null;if(I&&I.getValueState){T=I.getIndicationColor()}else if(t[I]){T=I}if(T){i();return e[T]}return null};return T},true);