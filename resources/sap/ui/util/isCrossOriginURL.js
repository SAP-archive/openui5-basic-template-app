/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/URI"],function(i){"use strict";function n(n){var e=new i(n),e=e.is("relative")?e.absoluteTo(document.baseURI):e,r=window.location.origin||(new i).origin();return e.origin()!==r}return n});