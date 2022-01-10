/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";function t(e,t){var r=Object.getOwnPropertyDescriptor(e,t);return r&&r.value}
/*!
	 * The following functions are taken from jQuery UI 1.8.17 but modified
	 *
	 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
	 * Dual licensed under the MIT or GPL Version 2 licenses.
	 * http://jquery.org/license
	 *
	 * http://docs.jquery.com/UI
	 */function r(t){var r=e(t).offsetParent();var a=false;var s=e(t).parents().filter(function(){if(this===r){a=true}return a});return!e(t).add(s).filter(function(){return e.css(this,"visibility")==="hidden"||e.expr.pseudos.hidden(this)}).length}function a(t,a){var s=t.nodeName.toLowerCase();if(s==="area"){var n=t.parentNode,i=n.name,u;if(!t.href||!i||n.nodeName.toLowerCase()!=="map"){return false}u=e("img[usemap='#"+i+"']")[0];return!!u&&r(u)}return(/input|select|textarea|button|object/.test(s)?!t.disabled:s=="a"?t.href||a:a)&&r(t)}if(!t(e.expr.pseudos,"focusable")){
/*!
		 * The following function is taken from jQuery UI 1.8.17
		 *
		 * Copyright 2011, AUTHORS.txt (http://jqueryui.com/about)
		 * Dual licensed under the MIT or GPL Version 2 licenses.
		 * http://jquery.org/license
		 *
		 * http://docs.jquery.com/UI
		 *
		 * But since visible is modified, focusable is different from the jQuery UI version too.
		 */
e.expr.pseudos.focusable=function(t){return a(t,!isNaN(e.attr(t,"tabindex")))}}if(!t(e.expr.pseudos,"sapTabbable")){
/*!
		 * The following function is taken from
		 * jQuery UI Core 1.11.1
		 * http://jqueryui.com
		 *
		 * Copyright 2014 jQuery Foundation and other contributors
		 * Released under the MIT license.
		 * http://jquery.org/license
		 *
		 * http://api.jqueryui.com/category/ui-core/
		 */
e.expr.pseudos.sapTabbable=function(t){var r=e.attr(t,"tabindex"),s=isNaN(r);return(s||r>=0)&&a(t,!s)}}if(!t(e.expr.pseudos,"sapFocusable")){e.expr.pseudos.sapFocusable=function(t){return a(t,!isNaN(e.attr(t,"tabindex")))}}return e});