import { PrismaClient, Cuisine, PRICE, Location, Review } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

const prisma = new PrismaClient();
export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  price: PRICE;
  location: Location;
  slug: string;
  reviews: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      price: true,
      location: true,
      slug: true,
      reviews: true
    }
  });
  return restaurants;
};
export default async function Home() {
  const restaurants: RestaurantCardType[] = await fetchRestaurants();
  return (
    <>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap justify-center'>
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurant={restaurant}></RestaurantCard>
        ))}
      </div>
    </>
  );
}
