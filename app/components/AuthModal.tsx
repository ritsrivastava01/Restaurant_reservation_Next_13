'use client';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    phoneNumber: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const renderContent = (signInContent: string, singUpContent: String) => {
    return isSignIn ? signInContent : singUpContent;
  };

  return (
    <div>
      <button
        className={`${renderContent(
          'bg-blue-400 text-white',
          ''
        )} border p-1 px-4 rounded mr-3}`}
        onClick={handleOpen}>
        {renderContent('Sing In', 'Sign Up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={style}>
          <div className='p-2'>
            <div className='uppercase font-bold text-center pb-2 mb-2 border-b'>
              <p className='text-sm'>
                {renderContent('Sign In', 'Create Account')}
              </p>
            </div>
            <div className='m-auto'>
              <h2 className='text-2xl font-light text-center'>
                {renderContent(
                  'Log in the your account',
                  'Create your new open table Account'
                )}
              </h2>
            </div>
            <AuthModalInput
              inputs={inputs}
              handleInputChange={handleInputChange}
              isSignIn={isSignIn}
            />

            <button className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'>
              {renderContent('Sign In', 'Create Account')}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
