/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/strings/capitalize","sap/ui/thirdparty/jquery"],function(e,r,t){"use strict";var a=e.getLogger("sap.ui.test.matchers.Properties");return function(e){return function(s){var u=true;t.each(e,function(e,n){var i=s["get"+r(e,0)];if(!i){u=false;a.error("Control '"+s+"' does not have a property '"+e+"'");return false}var o=i.call(s);if(n instanceof RegExp){u=n.test(o)}else if(t.isPlainObject(n)&&n.regex&&n.regex.source){var l=new RegExp(n.regex.source,n.regex.flags);u=l.test(o)}else{u=o===n}if(!u){a.debug("Control '"+s+"' property '"+e+"' has value '"+o+"' but should have value '"+n+"'");return false}});return u}}},true);