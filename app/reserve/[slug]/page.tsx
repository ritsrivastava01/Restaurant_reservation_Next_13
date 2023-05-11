import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import NavBar from '../../components/NavBar';
import Header from './components/Header';
import ReservationForm from './components/ReservationForm';

const prisma = new PrismaClient();

const fetchRestaurant = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
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
  if (!restaurant) {
    notFound();
  }
  return restaurant;
};

export default async function ReservePage({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { date: string; time: string; partySize: string };
}) {
  const restaurant = await fetchRestaurant(params.slug);
  return (
    <div className='border-t h-screen'>
      <div className='py-9 w-3/5 m-auto'>
        <Header
          title={restaurant.name}
          image={restaurant.main_image}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
        <ReservationForm
          slug={restaurant.slug}
          date={searchParams.date}
          partySize={searchParams.partySize}
        />
      </div>
    </div>
  );
}
