sap.ui.define([
    "sap/ui/core/mvc/Controller","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/model/FilterType"
], (Controller,Filter,FilterOperator,FilterType) => {
    "use strict";

    return Controller.extend("projectui5.controller.View1", {
        onInit() {
 
 
 console.log("View1 Controller Loaded");

 
 
        },
   
   
      onListPress: function(oEvent) {
    var orderID = oEvent.getParameter("listItem") // SAPUI5 event uses lowercase "listItem"
                 .getBindingContext().getProperty("OrderID");
    var oFilter = new Filter("OrderID", FilterOperator.EQ, orderID);
    var orderTable = this.getView().byId("orderTable"); // Correct casing!
    orderTable.getBinding("items").filter(oFilter, FilterType.Application);
},

onHomePress: function() {
     console.log("Home button pressed");
    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
    console.log("Home pressed, navigating!");
    oRouter.navTo("RouteView1", {}, true);
}

   
    });
});