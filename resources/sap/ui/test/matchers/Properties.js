/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_LogCollector","sap/base/Log","sap/base/strings/capitalize","sap/ui/thirdparty/jquery"],function(e,r,t,a){"use strict";var s=r.getLogger("sap.ui.test.matchers.Properties");return function(e){return function(r){var u=true;a.each(e,function(e,o){var i=r["get"+t(e,0)];if(!i){u=false;s.error("Control '"+r+"' does not have a property '"+e+"'");return false}var n=i.call(r);if(o instanceof RegExp){u=o.test(n)}else if(a.isPlainObject(o)&&o.regex&&o.regex.source){var l=new RegExp(o.regex.source,o.regex.flags);u=l.test(n)}else{u=n===o}if(!u){s.debug("Control '"+r+"' property '"+e+"' has value '"+n+"' but should have value '"+o+"'");return false}});return u}}},true);