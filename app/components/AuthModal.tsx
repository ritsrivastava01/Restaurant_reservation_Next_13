'use client';
import { useContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInput from './AuthModalInput';
import { useAuth } from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

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
  const { loading, data, errors } = useContext(AuthenticationContext);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [disabled, setDisabled] = useState(true);
  const { signIn, signUp } = useAuth();
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
  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else if (
      inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.city &&
      inputs.phoneNumber &&
      inputs.password
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);

  const renderContent = (signInContent: string, singUpContent: String) => {
    return isSignIn ? signInContent : singUpContent;
  };
  const handleClick = async () => {
    {
      if (isSignIn) {
        signIn(inputs.email, inputs.password, handleClose);
      } else {
        signUp(
          inputs.firstName,
          inputs.lastName,
          inputs.email,
          inputs.city,
          inputs.phoneNumber,
          inputs.password,
          handleClose
        );
      }
    }
  };

  return (
    <div>
      <button
        className={`${renderContent(
          'bg-blue-400 text-white mr-3',
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
          <div className='p-2 h-[500px]'>
            {errors ? (
              <Alert severity='error' className='mb-2'>
                {errors?.map(
                  ({ errorMessage }: { errorMessage: string }, index) => (
                    <li key={index}>{errorMessage}</li>
                  )
                )}
              </Alert>
            ) : null}

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

            <button
              className='uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 ml-3
               disabled:bg-gray-400 flex flex-row text-center justify-center'
              disabled={disabled || loading}
              onClick={handleClick}>
              {loading ? (
                <CircularProgress
                  size={'20px'}
                  className='mr-2'></CircularProgress>
              ) : null}
              {renderContent('Sign In', 'Create Account')}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
