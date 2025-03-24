import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";

import "../css/viewOrders.css";

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("https://pharmacy-backend-k2hi.onrender.com/orders/viewOrders");
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleMakeOrder = async (productId, medicineType) => {
    try {
      const response = await fetch(`https://pharmacy-backend-k2hi.onrender.com/supplier/fetch/${medicineType}`);
      if (!response.ok) throw new Error("Failed to fetch suppliers");

      const data = await response.json();
      const filteredData = data.filter((supplier) => supplier.medicine_type === medicineType);

      if (filteredData.length === 0) {
        console.warn("No suppliers found for this medicine type");
      }

      setFilteredSuppliers(filteredData);
    } catch (err) {
      console.error("Error fetching suppliers:", err);
    }
  };

  const handleSendOrder = async (supplierId, orderId) => {
    try {
      const response = await fetch("https://pharmacy-backend-k2hi.onrender.com/report/sendOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplierId, orderId }),
      });

      if (!response.ok) throw new Error("Failed to send order");

      const data = await response.json();
      console.log(`Order sent to supplier with ID ${supplierId} for order ID ${orderId}`, data);

      // Fetch the report data for the selected supplier
      const reportResponse = await fetch(`https://pharmacy-backend-k2hi.onrender.com/report/viewReports/${supplierId}`);
      if (!reportResponse.ok) throw new Error("Failed to fetch report data");

      const reportData = await reportResponse.json();
      console.log(`Report data for supplier with ID ${supplierId}:`, reportData);

      setSelectedReport(reportData[0]);
    } catch (err) {
      console.error("Error sending order:", err);
    }
  };

  return (
    <div>
      <h1 id="view-orders-head">Orders</h1>
      <table id="view-orders">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Medicine Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.product_name}</td>
              <td>{order.quantity}</td>
              <td>{order.medicine_type}</td>
              <td>
                <button id="makeOrders" onClick={() => handleMakeOrder(order._id, order.medicine_type)}>
                  Make Order
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredSuppliers.length > 0 && (
        <div id="filtered-supplier">
          <h1 id="filtered-supplier-head">Filtered Suppliers</h1>
          <table id="filtered-supplier-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Medicine Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => {
                const matchingOrder = orders.find((order) => order.medicine_type === supplier.medicine_type);
                return (
                  <tr key={supplier._id}>
                    <td>{supplier.name}</td>
                    <td>{supplier.medicine_type}</td>
                    <td>
                      <button
                        id="send-order-button"
                        onClick={() => matchingOrder && handleSendOrder(supplier._id, matchingOrder._id)}
                      >
                        Send Order
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selectedReport && <OrderDetails report={selectedReport} />}
    </div>
  );
};

export default ViewOrders;
