import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';

const MainLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      return user && user.token ? true : false;
    });


  return (
    <>
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Outlet />
      <ToastContainer />
    </>
  );
};
export default MainLayout;
