sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/FilterType"
], (Controller, Filter, FilterOperator, FilterType) => {
  "use strict";

  return Controller.extend("projectui5.controller.View1", {

    onInit: function () {
      console.log("View1 Controller Loaded");

      // Create script tag only once
      if (!document.getElementById("cai-webchat")) {
        var s = document.createElement("script");
        s.id = "cai-webchat";
        s.src = "https://cdn.cai.tools.sap/webchat/webchat.js";
        s.async = true;

        s.onload = function () {
          window.caiWebchat.init({
            channelId: "0c2a070f-18a3-443c-abe0-5664500a45b5",
            token: "f51f7ee25df895b6a21dd0cf8aacf185",
            settings: {
              startBehavior: "button", // show small button, click to open/minimize
              side: "right",
              marginX: 20,
              marginY: 20,
              width: 380,
              height: 520,
              roundedCorners: true
            }
          });
        };

        document.body.appendChild(s);
      }
    },

    onListPress: function (oEvent) {
      var orderID = oEvent.getParameter("listItem")
        .getBindingContext().getProperty("OrderID");
      var oFilter = new Filter("OrderID", FilterOperator.EQ, orderID);
      var orderTable = this.getView().byId("orderTable");
      orderTable.getBinding("items").filter(oFilter, FilterType.Application);
    },

    onHomePress: function () {
      console.log("Home button pressed");
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("RouteView1", {}, true);
    }

  });
});
