import axios from 'axios';
import { useState } from 'react';

interface availabilityState {
  loading: boolean;
  data: [{ time: string; available: boolean }] | null;
  error: string | null;
}

export default function useAvailabilities() {
  const [availability, setAvailability] = useState<availabilityState>({
    loading: false,
    data: null,
    error: null
  });

  const fetchAvailabilities = async ({
    slug,
    partySize,
    day,
    time
  }: {
    slug: string;
    partySize: number;
    day: string | null;
    time: string;
  }) => {
    setAvailability({ ...availability, loading: true });

    try {
      const response = await axios.get(
        `http://localhost:3000/api/restaurant/${slug}/availability`,
        {
          params: {
            day,
            time,
            partySize
          }
        }
      );
      setAvailability({ ...availability, loading: false, data: response.data });
    } catch (error: any) {
      setAvailability({
        ...availability,
        loading: false,
        error: error.response.data.errorMessage
      });
    }
  };

  return { fetchAvailabilities, availability };
}
