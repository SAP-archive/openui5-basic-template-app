/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(e){"use strict";var n={};n.events=["click","dblclick","contextmenu","focusin","focusout","keydown","keypress","keyup","mousedown","mouseout","mouseover","mouseup","select","selectstart","dragstart","dragenter","dragover","dragleave","dragend","drop","compositionstart","compositionend","paste","cut","input","change"];n.bindAnyEvent=function(t){if(t){e(document).on(n.events.join(" "),t)}};n.unbindAnyEvent=function t(o){if(o){e(document).off(n.events.join(" "),o)}};return n});