import React from 'react';

export interface AuthModalInputProps {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    phoneNumber: string;
    password: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignIn: boolean;
}
export default function AuthModalInput({
  inputs,
  handleInputChange,
  isSignIn
}: AuthModalInputProps) {
  return (
    <div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            id=''
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='First Name'
            value={inputs.firstName}
            name='firstName'
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='lastName'
            id=''
            className='border rounder p-2 py-3 w-[49%]'
            placeholder='Last Name'
            value={inputs.lastName}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          name='email'
          id=''
          className='border rounder p-2 py-3 w-full'
          placeholder='Email'
          value={inputs.email}
          onChange={handleInputChange}
        />
      </div>
      {isSignIn ? null : (
        <div className='my-3 flex justify-between text-sm'>
          <input
            type='text'
            name='city'
            id=''
            className='border rounded p-2 py-3 w-[49%]'
            placeholder='City'
            value={inputs.city}
            onChange={handleInputChange}
          />
          <input
            type='text'
            name='phoneNumber'
            id=''
            className='border rounder p-2 py-3 w-[49%]'
            placeholder='Phone Number'
            value={inputs.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
      )}
      <div className='my-3 flex justify-between text-sm'>
        <input
          type='text'
          name='password'
          id=''
          className='border rounder p-2 py-3 w-full'
          placeholder='Password'
          value={inputs.password}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}
