import Link from 'next/link';
import React from 'react';
import { RestaurantCardType } from '../page';
import Price from './Price';
import Stars from './Stars';

export default function RestaurantCard({
  restaurant
}: {
  restaurant: RestaurantCardType;
}) {
  return (
    <div>
      {' '}
      <div className='w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer'>
        <Link href={`/restaurant/${restaurant.slug}`}>
          <img src={restaurant.main_image} alt='' className='w-full h-36' />
          <div className='p-1'>
            <h3 className='font-bold text-2xl mb-2'>{restaurant.name}</h3>
            <div className='flex items-start'>
              <div className='flex mb-2'>
                <Stars reviews={restaurant.reviews}></Stars>
              </div>
              <p className='ml-2'>{restaurant.reviews.length} reviews</p>
            </div>
            <div className='flex text-reg font-light capitalize'>
              <p className=' mr-3'>{restaurant.cuisine.name}</p>
              <Price price={restaurant.price}></Price>
              <p> {restaurant.location.name}</p>
            </div>
            <p className='text-sm mt-1 font-bold'>Booked 3 times today</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
