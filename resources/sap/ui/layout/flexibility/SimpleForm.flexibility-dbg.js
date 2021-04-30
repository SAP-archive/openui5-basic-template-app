/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

/*global sap */

sap.ui.define([
    "sap/ui/layout/changeHandler/RenameSimpleForm",
    "sap/ui/layout/changeHandler/MoveSimpleForm",
    "sap/ui/layout/changeHandler/HideSimpleForm",
    "sap/ui/layout/changeHandler/UnhideSimpleForm",
    "sap/ui/layout/changeHandler/AddSimpleFormGroup",
    "sap/ui/layout/changeHandler/AddSimpleFormField"
], function (RenameSimpleForm, MoveSimpleForm, HideSimpleForm, UnhideSimpleForm, AddSimpleFormGroup, AddSimpleFormField) {
    "use strict";

    return {
        "renameLabel": RenameSimpleForm,
        "renameTitle": RenameSimpleForm,
        "moveSimpleFormField": MoveSimpleForm,
        "moveSimpleFormGroup": MoveSimpleForm,
        "hideSimpleFormField": HideSimpleForm,
        "unhideSimpleFormField": UnhideSimpleForm,
        "removeSimpleFormGroup": HideSimpleForm,
        "addSimpleFormGroup": AddSimpleFormGroup,
        "addSimpleFormField" : AddSimpleFormField
    };
}, /* bExport= */true);
