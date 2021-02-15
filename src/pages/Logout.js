import React, { useEffect } from 'react';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import API from '../data';
import Cookies from 'js-cookie';

const Logout = () => {
  const { logout } = useAuth();
  useEffect( () => {
    logout();
  }, [logout] );
  return <p>Logging out...</p>;
};

export default withAuth( Logout, '/' );
