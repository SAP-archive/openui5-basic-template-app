/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";e.fn.disableSelection=function(){return this.on(("onselectstart"in document.createElement("div")?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})};e.fn.enableSelection=function(){return this.off(".ui-disableSelection")};return e});