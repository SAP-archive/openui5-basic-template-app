/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert"],function(r){"use strict";var e=function(e){r(e instanceof Array,"uniqueSort: input parameter must be an Array");var a=e.length;if(a>1){e.sort();var n=0;for(var t=1;t<a;t++){if(e.indexOf(e[t])===t){e[++n]=e[t]}}if(++n<a){e.splice(n,a-n)}}return e};return e});