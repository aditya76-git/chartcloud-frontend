import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import api from '@/api/client';
import { Loader2 } from 'lucide-react';
import useUserInfoStore from '@/store/user-info-store';

export const isAuthenticated = async () => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const expiry = localStorage.getItem('expiry');

  if (accessToken && refreshToken && expiry) {
    try {
      const response = await api.get('/user/info');
      if (response?.data?.success) {
        useUserInfoStore.getState().setUserInfo(response.data.info);
        return true;
      }
    } catch (error) {
      console.error('Authentication check failed:', error);
      return false;
    }
  }

  return false;
};

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated();
      setIsAuth(authStatus);
      setLoading(false);
    };

    checkAuth();
  }, []);


  if (loading) {
    return <div className='h-screen flex items-center justify-center'>
      <Loader2 className='animate-spin h-24 w-24' />
    </div>;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
