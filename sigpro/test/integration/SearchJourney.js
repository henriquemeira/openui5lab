sap.ui.define(["sap/ui/test/opaQunit","sap/ui/demo/todo/test/integration/pages/App"],function(e){"use strict";QUnit.module("Search");e("should show correct item count after search (1)",function(e,t,r){e.iStartMyApp();t.onTheAppPage.iEnterTextForSearchAndPressEnter("earn");r.onTheAppPage.iShouldSeeItemCount(1);r.iTeardownMyApp()});e("should show correct item count after search (0)",function(e,t,r){e.iStartMyApp();t.onTheAppPage.iEnterTextForSearchAndPressEnter("there should not be an item for this search");r.onTheAppPage.iShouldSeeItemCount(0);r.iTeardownMyApp()});e("should show correct item count after search and clearing the search",function(e,t,r){e.iStartMyApp();t.onTheAppPage.iEnterTextForSearchAndPressEnter("earn").and.iEnterTextForSearchAndPressEnter("");r.onTheAppPage.iShouldSeeItemCount(2);r.iTeardownMyApp()})});