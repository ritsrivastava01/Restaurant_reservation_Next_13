import axios from 'axios';
import {
  deleteCookie,
  getCookie,
  getCookies,
  removeCookies
} from 'cookies-next';
import { useContext } from 'react';
import { AuthenticationContext } from '../app/context/AuthContext';

export const useAuth = () => {
  const { setAuthState, data } = useContext(AuthenticationContext);

  const signIn = async (
    email: string,
    password: string,
    handleClose: () => void
  ) => {
    setAuthState({ loading: true, data: null, errors: null });
    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password
      });
      const data = response.data;

      setAuthState({ loading: false, data: data, errors: null });
      handleClose();
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        errors: error.response.data.errors
      });
    }
  };

  const signUp = async (
    first_name: string,
    last_name: string,
    email: string,
    city: string,
    phone: string,
    password: string,
    handelClose: () => void
  ) => {
    try {
      setAuthState({ loading: true, data: null, errors: null });
      const response = await axios.post('/api/auth/signup', {
        first_name,
        last_name,
        email,
        city,
        phone,
        password
      });
      handelClose();
      setAuthState({ loading: false, data: response.data, errors: null });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        errors: error.response.data.errors
      });
    }
  };
  const signOut = async () => {
    deleteCookie('jwt');
    window.location.reload();
    setAuthState({ loading: false, data: null, errors: null });
  };

  return { signIn, signUp, signOut };
};
