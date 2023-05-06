import { Review } from '@prisma/client';

export const calculateReviewRatingAverage = (reviews: Review[]) => {
  let sum = 0;
  for (let i = 0; i < reviews.length; i++) {
    sum += reviews[i].rating;
  }
  return sum / reviews.length;
};
