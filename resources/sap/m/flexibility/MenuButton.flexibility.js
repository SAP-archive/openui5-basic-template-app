/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/changeHandler/SplitMenuButton","sap/ui/fl/changeHandler/BaseRename"],function(e,n){"use strict";return{splitMenuButton:e,rename:n.createRenameChangeHandler({propertyName:"text",translationTextType:"XFLD"})}},true);