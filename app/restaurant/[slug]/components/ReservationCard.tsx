'use client';

import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { partySize, times } from '../../../../data';
import useAvailabilities from '../../../../hooks/useAvailability';
import {
  convertToDisplayTime,
  Time
} from '../../../../utils/convertToDisplayTime';
import { RestaurantType } from '../page';

export default function ReservationCard({
  openTime,
  closeTime,
  slug
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) {
  const [day, setDay] = useState<string | null>(
    new Date().toISOString().split('T')[0]
  );
  const [time, setTime] = useState(openTime);
  const [partySizeCount, setPartySizeCount] = useState(3);
  const { fetchAvailabilities, availability } = useAvailabilities();

  const handelChick = async () => {
    await fetchAvailabilities({
      slug,
      partySize: partySizeCount,
      day,
      time
    });
  };
  return (
    <div className='fixed w-[25%] bg-white rounded p-3 shadow'>
      <div className='text-center border-b pb-2 font-bold'>
        <h4 className='mr-7 text-lg'>Make a Reservation</h4>
      </div>
      <div className='my-3 flex flex-col'>
        <label htmlFor=''>Party size</label>
        <select
          name=''
          className='py-3 border-b font-light'
          id='partySize'
          value={partySizeCount}
          onChange={(e) => setPartySizeCount(Number(e.target.value))}>
          {partySize.map((size) => (
            <option value={size.value} key={size.value}>
              {size.label}{' '}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Date</label>
          <ReactDatePicker
            selected={new Date()}
            onChange={(date) =>
              setDay(date ? date.toISOString().split('T')[0] : null)
            }
            className='py-3 border-b font-light text-reg w-28'
            dateFormat='MMMM d'
            wrapperClassName='w=[48%]'></ReactDatePicker>
        </div>
        <div className='flex flex-col w-[48%]'>
          <label htmlFor=''>Time</label>
          <select
            name=''
            id=''
            className='py-3 border-b font-light'
            value={time}
            onChange={(e) => setTime(e.target.value)}>
            {times.map((time, index) =>
              time.time >= openTime && time.time <= closeTime ? (
                <option value={time.displayTime} key={index}>
                  {time.displayTime}
                </option>
              ) : null
            )}
          </select>
        </div>
      </div>
      <div className='mt-5'>
        <button
          className='bg-red-600 rounded w-full px-4 text-white font-bold h-16  disabled:bg-gray-400 flex flex-row justify-center items-center'
          disabled={availability.loading}
          onClick={handelChick}>
          {availability.loading ? (
            <CircularProgress size={'20px'} className='mr-2'></CircularProgress>
          ) : null}
          Find a Time
        </button>
      </div>
      {availability.data && availability.data.length ? (
        <div className='mt-4'>
          <p className='text-reg'>Select a Time</p>
          <div className='flex flex-wrap mt-2'>
            {availability.data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySizeCount}`}
                  className='bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3'>
                  <p className='text-sm font-bold'>
                    {convertToDisplayTime(time.time as Time)}
                  </p>
                </Link>
              ) : (
                <p className='bg-gray-300 p-2 w-24 mb-3 rounded mr-3'></p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
