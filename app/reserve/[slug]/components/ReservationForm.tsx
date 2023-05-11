'use client';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import useReservation from '../../../../hooks/useReservation';

export default function ReservationForm({
  slug,
  date,
  partySize
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const [disabled, setDisabled] = useState(true);
  const [inputs, setInputs] = useState({
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerEmail: '',
    bookerOccasion: '',
    bookerRequests: ''
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };
  const handleClick = async () => {
    const [day, time] = date.split('T');
    const booking = await createReservation({
      slug,
      partySize,
      time,
      day,
      bookerFirstName: inputs.bookerFirstName,
      bookerLastName: inputs.bookerLastName,
      bookerEmail: inputs.bookerEmail,
      bookerOccasion: inputs.bookerOccasion,
      bookerPhone: inputs.bookerPhone,
      bookerRequest: inputs.bookerRequests
    });
  };
  useEffect(() => {
    if (
      inputs.bookerFirstName &&
      inputs.bookerLastName &&
      inputs.bookerPhone &&
      inputs.bookerEmail
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [inputs]);
  const { createReservation, loading, error } = useReservation();

  return (
    <div className='mt-10 flex flex-wrap justify-between w-[660px]'>
      <input
        name='bookerFirstName'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='First name'
        onChange={handleChangeInput}
      />
      <input
        name='bookerLastName'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='Last name'
        onChange={handleChangeInput}
      />
      <input
        name='bookerPhone'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='Phone number'
        onChange={handleChangeInput}
      />
      <input
        name='bookerEmail'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='Email'
        onChange={handleChangeInput}
      />
      <input
        name='bookerOccasion'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='Occasion (optional)'
        onChange={handleChangeInput}
      />
      <input
        name='bookerRequests'
        type='text'
        className='border rounded p-3 w-80 mb-4'
        placeholder='Requests (optional)'
        onChange={handleChangeInput}
      />
      <button
        onClick={handleClick}
        className='bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300'
        disabled={disabled || loading}>
        {loading ? (
          <CircularProgress color='inherit'></CircularProgress>
        ) : (
          'Complete reservation'
        )}
      </button>
      <p className='mt-4 text-sm'>
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
}
