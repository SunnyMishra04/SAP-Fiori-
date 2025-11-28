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

      // Chatbot script load once
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
              startBehavior: "button",
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

      // VizFrame configs
      var oColumn = this.byId("orderChartColumn");
      if (oColumn) {
        oColumn.setVizProperties({
          plotArea: { dataLabel: { visible: true } },
          legend: { visible: true },
          title: { visible: true, text: "Quantity by Product (Column)" }
        });
      }

      var oDonut = this.byId("orderChartDonut");
      if (oDonut) {
        oDonut.setVizProperties({
          plotArea: { dataLabel: { visible: true } },
          legend: { visible: true },
          title: { visible: true, text: "Quantity Share by Product (Donut)" }
        });
      }
    },

    onListPress: function (oEvent) {
      var orderID = oEvent.getParameter("listItem")
        .getBindingContext().getProperty("OrderID");

      var oFilter = new Filter("OrderID", FilterOperator.EQ, orderID);

      // Filter table
      var oTable = this.byId("orderTable");
      if (oTable && oTable.getBinding("items")) {
        oTable.getBinding("items").filter(oFilter, FilterType.Application);
      }

      // Filter charts' datasets
      var oColumn = this.byId("orderChartColumn");
      if (oColumn && oColumn.getDataset().getBinding("data")) {
        oColumn.getDataset().getBinding("data").filter([oFilter]);
      }

      var oDonut = this.byId("orderChartDonut");
      if (oDonut && oDonut.getDataset().getBinding("data")) {
        oDonut.getDataset().getBinding("data").filter([oFilter]);
      }
    },

    onHomePress: function () {
      console.log("Home button pressed");
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo("RouteView1", {}, true);
    }

  });
});
