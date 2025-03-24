import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReportManagement = () => {
  const [supplierId, setSupplierId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [reports, setReports] = useState([]);
  const [supplierName, setSupplierName] = useState('');

  useEffect(() => {
    if (supplierId) {
      fetchReports();
    }
  }, [supplierId]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`https://pharmacy-backend-k2hi.onrender.com/reports/viewReports/${supplierId}`);
      setReports(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteReport = async (reportId) => {
    try {
      await axios.delete(`https://pharmacy-backend-k2hi.onrender.com/reports/deleteReports/${reportId}`);
      setReports(reports.filter(report => report._id !== reportId));
    } catch (err) {
      console.error(err);
    }
  };

  const sendOrder = async () => {
    try {
      const res = await axios.post('https://pharmacy-backend-k2hi.onrender.com/reports/sendOrder', { supplierId, orderId });
      setReports([...reports, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSupplierName = async (reportId) => {
    try {
      const res = await axios.get(`https://pharmacy-backend-k2hi.onrender.com/reports/getSupplierNameByReport/${reportId}`);
      setSupplierName(res.data.supplierName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Report Management</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Supplier ID"
          value={supplierId}
          onChange={(e) => setSupplierId(e.target.value)}
        />
        <button onClick={fetchReports}>View Reports</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button onClick={sendOrder}>Send Order</button>
      </div>
      <h2>Reports</h2>
      <ul>
        {reports.map(report => (
          <li key={report._id}>
            {report.product_name} - {report.quantity} - {report.status}
            <button onClick={() => deleteReport(report._id)}>Delete</button>
            <button onClick={() => fetchSupplierName(report._id)}>Get Supplier Name</button>
          </li>
        ))}
      </ul>
      {supplierName && <p>Supplier Name: {supplierName}</p>}
    </div>
  );
};

export default ReportManagement;
