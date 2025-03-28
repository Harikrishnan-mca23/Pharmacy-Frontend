import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/addOrder.css';

const AddOrder = () => {
  const [product_name, setProductName] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [medicine_type, setMedicineType] = useState('');
  const [medicineTypes, setMedicineTypes] = useState([]);

  useEffect(() => {
    const fetchMedicineTypes = async () => {
      try {
        const res = await axios.get('https://pharmacy-backend-k2hi.onrender.com/orders/medicine_types');
        console.log(res.data);
        setMedicineTypes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchMedicineTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://pharmacy-backend-k2hi.onrender.com/orders/addOrders', {
        product_name,
        quantity,
        medicine_type,
      });
      console.log(res.data);
      // Clear form inputs
      setProductName('');
      setQuantity(0);
      setMedicineType('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form id="add-order-form" onSubmit={handleSubmit}>
      <div>
        <h1 id="add-order-head">Make your order here</h1>
        <label htmlFor="product_name">Product Name</label>
        <input
          type="text"
          id="product_name"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label htmlFor="medicine_type">Medicine Type</label>
        <select
          id="medicine_type"
          value={medicine_type}
          onChange={(e) => setMedicineType(e.target.value)}
          required
        >
          <option value="" disabled>Select medicine type</option>
          <option value="Herbal">Herbal</option>
          <option value="Tablet">Tablet</option>

          {medicineTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add Order</button>
    </form>
  );
};

export default AddOrder;
