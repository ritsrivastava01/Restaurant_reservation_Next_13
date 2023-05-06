import { PrismaClient } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard, { Restaurant } from './components/RestaurantCard';
import SearchSideBar from './components/SearchSideBar';

const prisma = new PrismaClient();
interface SearchParams {
  city?: string;
  cuisine?: string;
  price?: string;
}
const fetchRestaurantsBySearchKeys = (searchParams: SearchParams) => {
  const select = {
    id: true,
    name: true,
    main_image: true,
    cuisine: true,
    price: true,
    location: true,
    slug: true,
    reviews: true
  };

  const where: any = {};
  if (searchParams.city) {
    where.location = {
      name: {
        contains: searchParams.city.toLowerCase()
      }
    };
  }
  if (searchParams.cuisine) {
    where.cuisine = {
      name: {
        equals: searchParams.cuisine.toLowerCase()
      }
    };
  }
  if (searchParams.price) {
    where.price = {
      equals: searchParams.price
    };
  }
  console.log(where);
  return prisma.restaurant.findMany({
    where,
    select
  });
};

const fetchRestaurantLocation = async () => {
  return await prisma.location.findMany();
};
const fetchCuisine = async () => {
  return await prisma.cuisine.findMany();
};

export default async function Search({
  searchParams
}: {
  searchParams: SearchParams;
}) {
  const restaurants = await fetchRestaurantsBySearchKeys(searchParams);
  const location = await fetchRestaurantLocation();
  const cuisine = await fetchCuisine();

  return (
    <>
      <Header />
      <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
        <SearchSideBar
          location={location}
          cuisine={cuisine}
          searchParams={searchParams}
        />
        <div className='w-5/6'>
          {restaurants.length ? (
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))
          ) : (
            <h1 className='text-2xl text-center'>No restaurants found</h1>
          )}
        </div>
      </div>
    </>
  );
}
