import axios from 'axios';
import { useQuery } from 'react-query';
import Booking from '../booking';

export function useBookings() {
	const { data, isLoading } = useQuery(['allBookings'], {
		queryFn: async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}booking/allBookings`);
			return data as Booking[];
		},
		staleTime: 3000,
	});

	return { bookings: data, isLoading };
}

export default useBookings;
