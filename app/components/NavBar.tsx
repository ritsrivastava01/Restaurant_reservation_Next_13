'use client';
import { deleteCookie } from 'cookies-next';
import Link from 'next/link';
import { useContext } from 'react';

import { useAuth } from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';

import AuthModal from './AuthModal';

export default function NavBar() {
  const { data, loading } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  const clickHandler = () => {
    signOut();
  };

  return (
    <nav className='bg-white p-2 flex justify-between'>
      <Link href='/' className='font-bold text-gray-700 text-2xl'>
        OpenTable
      </Link>
      <div>
        {loading ? null : (
          <div className='flex'>
            {data ? (
              <div className='flex text-center'>
                {`Welcome ${data?.firstName} ${data?.lastName}`}
                <button
                  className='bg-blue-400 text-white border p-1 px-4 rounded mr-3 ml-3'
                  onClick={clickHandler}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <AuthModal isSignIn={true} />
                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
