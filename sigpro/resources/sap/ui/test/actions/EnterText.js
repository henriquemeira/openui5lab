/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/test/actions/Action","sap/ui/events/KeyCodes","sap/base/Log"],function(t,e,i,r){"use strict";var s=t.getLogger("sap.ui.test.actions.EnterText");return e.extend("sap.ui.test.actions.EnterText",{metadata:{properties:{text:{type:"string"},clearTextFirst:{type:"boolean",defaultValue:true}},publicMethods:["executeOn"]},executeOn:function(t){var e=this.$(t),a=e[0];if(!a){return}if(this.getText()===undefined||!this.getClearTextFirst()&&!this.getText()){r.error("Please provide a text for this EnterText action",this._sLogPrefix);return}var n=this.getUtils();s.timestamp("opa.actions.enterText");s.debug("Enter text in control "+t);this._tryOrSimulateFocusin(e,t);if(this.getClearTextFirst()){n.triggerKeydown(a,i.DELETE);n.triggerKeyup(a,i.DELETE);e.val("");n.triggerEvent("input",a)}var u=e.val();this.getText().split("").forEach(function(t){u+=t;n.triggerCharacterInput(a,t,u);n.triggerEvent("input",a)});this._simulateFocusout(a);n.triggerEvent("search",a)}})});