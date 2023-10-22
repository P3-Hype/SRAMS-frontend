import { useQuery } from "react-query";
import axios from 'axios';

export function useAllRooms() {
    const { data, isLoading } = useQuery(['allRooms'], {
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8080/room/all");
            return data;
        },
        refetchInterval: 3000
    });
    return { rooms: data, isLoading }
}

export function useRoom(id: string) {
    const { data, isLoading } = useQuery(['room', id], {
        queryFn: async () => {
            const { data } = await axios.get("http://localhost:8080/room/getRoom", {params: {roomId: id}});
            return data;
        }
    });
    return { room: data, isLoading }
}