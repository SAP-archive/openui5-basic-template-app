/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/inputUtils/ListHelpers"],function(t){"use strict";var e=function(e,i){var a=e.item;var r=a.data(t.CSS_CLASS+"ListItem");var s;var p;var n;var o={text:"title",enabled:"visible",tooltip:"tooltip"};var l=e.propName;var v=e.propValue;if(!r){return}if(o[l]){p=o[l];n="set"+p.charAt(0).toUpperCase()+p.slice(1);r[n](v)}if(l==="additionalText"){s=i?v:"";r.setInfo(s)}};return e});