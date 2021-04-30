/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device"],function(e){"use strict";var r=function r(n,o){var i="noopener,noreferrer";if(e.browser.msie||e.browser.edge){var u=window.open("about:blank",o,i);if(u){u.opener=null;u.location.href=n}return null}return window.open(n,o,i)};return r});