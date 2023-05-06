import { Review } from '@prisma/client';
import { calculateReviewRatingAverage } from '../../../../utils/calculateReviewRatingAverage';
import Stars from '../../../components/Stars';

export default function Rating({ reviews }: { reviews: Review[] }) {
  const count = reviews.length;
  const averageRating = calculateReviewRatingAverage(reviews).toFixed(1);
  return (
    <div className='flex items-end'>
      <div className='ratings mt-2 flex items-center'>
        <p>
          <Stars reviews={reviews}></Stars>
        </p>
        <p className='text-reg ml-3'>{averageRating}</p>
      </div>
      <div>
        <p className='text-reg ml-4'>{count} Reviews</p>
      </div>
    </div>
  );
}
