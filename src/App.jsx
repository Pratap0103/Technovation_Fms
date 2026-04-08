import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CRM from './pages/CRM';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import Inventory from './pages/Inventory';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Vendors from './pages/Vendors';
import Installation from './pages/Installation';
import Service from './pages/Service';
import Warranty from './pages/Warranty';
import Expenses from './pages/Expenses';
import Attendance from './pages/Attendance';
import Bilty from './pages/Bilty';
import Accounts from './pages/Accounts';

const pageMap = {
  dashboard: Dashboard,
  crm: CRM,
  sales: Sales,
  purchase: Purchase,
  inventory: Inventory,
  products: Products,
  customers: Customers,
  vendors: Vendors,
  installation: Installation,
  service: Service,
  warranty: Warranty,
  expenses: Expenses,
  attendance: Attendance,
  bilty: Bilty,
  accounts: Accounts,
};

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState(null);

  // Check local storage for persistent login
  useEffect(() => {
    const savedUser = localStorage.getItem('masion_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('masion_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('masion_user');
    setCurrentPage('dashboard'); // Reset page view on logout
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const PageComponent = pageMap[currentPage] || Dashboard;

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      user={user}
      onLogout={handleLogout}
    >
      <PageComponent />
    </Layout>
  );
}

export default App;
