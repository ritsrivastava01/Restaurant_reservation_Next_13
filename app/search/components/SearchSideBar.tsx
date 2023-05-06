import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';
import Price from '../../components/Price';

export default function SearchSideBar({
  location,
  cuisine,
  searchParams
}: {
  location: Location[];
  cuisine: Cuisine[];
  searchParams: any;
}) {
  const prices = [
    { price: PRICE.CHEAP, label: '$' },
    { price: PRICE.REGULAR, label: '$$' },
    { price: PRICE.EXPENSIVE, label: '$$$' }
  ];
  return (
    <div className='w-1/5'>
      <div className='border-b pb-4 flex flex-col'>
        <h1 className='mb-2'>Region</h1>
        {location.map((loc) => (
          <Link
            href={{
              pathname: '/search',
              query: { ...searchParams, city: loc.name.toLowerCase() }
            }}
            replace
            key={loc.id}
            className='font-light text-reg capitalize'>
            {loc.name}
          </Link>
        ))}
      </div>
      <div className='border-b pb-4 mt-3 flex flex-col'>
        <h1 className='mb-2'>Cuisine</h1>
        {cuisine.map((c) => (
          <Link
            key={c.id}
            href={{
              pathname: '/search',
              query: { ...searchParams, cuisine: c.name.toLowerCase() }
            }}
            replace
            className='font-light text-reg capitalize'>
            {c.name}
          </Link>
        ))}
      </div>
      <div className='mt-3 pb-4'>
        <h1 className='mb-2'>Price</h1>
        <div className='flex'>
          {prices.map(({ price, label }, index) => (
            <Link
              key={index}
              className='border w-full text-reg font-light rounded-l p-2'
              href={{
                pathname: '/search',
                query: { ...searchParams, price }
              }}>
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
