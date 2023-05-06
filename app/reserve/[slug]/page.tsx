import NavBar from '../../components/NavBar';
import Header from './components/Header';
import ReservationForm from './components/ReservationForm';

export default function ReservePage() {
  return (
    <div className='border-t h-screen'>
      <div className='py-9 w-3/5 m-auto'>
        <Header />
        <ReservationForm />
      </div>
    </div>
  );
}
