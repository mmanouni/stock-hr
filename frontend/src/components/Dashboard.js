import React, { useEffect, useState } from 'react';
import { getProducts, getEmployees } from '../services/api';

const apiUrl = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts(apiUrl);
        setProducts(productsData);
        const employeesData = await getEmployees(apiUrl);
        setEmployees(employeesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render products and employees */}
    </div>
  );
};

export default Dashboard;
