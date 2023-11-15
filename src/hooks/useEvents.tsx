import { useQuery } from "react-query";
import SramsEvent from "../event";
import axios from "axios";

function useAllEvents() {
    const { data: events, isLoading } = useQuery('allEvents', {
		queryFn: async () => {
			const { data: events }: { data: SramsEvent[] } = await axios.get(
				`${import.meta.env.VITE_SRAMS_API_ADDRESS}events/all`
			);
			return events.sort((a, b) => b.timeStamp - a.timeStamp);
		},
		refetchInterval: 10 * 1000,
	});

    return { events, isLoading };
}

export default useAllEvents;