'use client';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
}

interface State {
  loading: boolean;
  data: User | null;
  errors: [{ errorMessage: string; valid: boolean }] | null;
}

interface AuthState extends State {
  setAuthState: React.Dispatch<React.SetStateAction<State>>;
}
export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  errors: null,
  setAuthState: () => {}
});

export default function AuthContext({
  children
}: {
  children: React.ReactNode;
}) {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    errors: null
  });
  const fetchUser = async () => {
    try {
      setAuthState({ loading: true, data: null, errors: null });
      const jwtToken = getCookie('jwt');

      if (!jwtToken) {
        return setAuthState({ loading: false, data: null, errors: null });
      }
      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwtToken}`
        }
      });

      axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
      setAuthState({ loading: false, data: response.data, errors: null });
    } catch (error: any) {
      setAuthState({
        loading: false,
        data: null,
        errors: error.response.data.errors
      });
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
