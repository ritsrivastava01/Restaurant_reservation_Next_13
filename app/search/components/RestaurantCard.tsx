import { Cuisine, PRICE, Location, Review } from '@prisma/client';
import Link from 'next/link';
import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverage';
import Price from '../../components/Price';
import Stars from '../../components/Stars';

export interface Restaurant {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  price: PRICE;
  location: Location;
  slug: string;
  reviews: Review[];
}

export default function RestaurantCard({
  restaurant
}: {
  restaurant: Restaurant;
}) {
  const renderReviewText = (reviews: Review[]) => {
    if (reviews.length === 0) {
      return 'Not rated yet';
    }
    const averageReview = calculateReviewRatingAverage(reviews);
    if (averageReview >= 4) return 'Awesome';
    else if (averageReview < 4) return 'Good';
  };

  return (
    <div className='border-b flex pb-5'>
      <img src={restaurant.main_image} alt='' className='w-44 h-36 rounded' />
      <div className='pl-5'>
        <h2 className='text-3xl'>{restaurant.name}</h2>
        <div className='flex items-start'>
          <div className='flex mb-2'>
            <Stars reviews={restaurant.reviews}></Stars>
          </div>
          <p className='ml-2 text-sm'>{renderReviewText(restaurant.reviews)}</p>
        </div>
        <div className='mb-9'>
          <div className='font-light flex text-reg'>
            <Price price={restaurant.price}></Price>
            <p className='mr-4 capitalize'>{restaurant.cuisine.name}</p>
            <p className='mr-4 capitalize'>{restaurant.location.name}</p>
          </div>
        </div>
        <div className='text-red-600'>
          <Link href={`restaurant/${restaurant.slug}`}>
            View more information
          </Link>
        </div>
      </div>
    </div>
  );
}
