import { useEffect, useState } from "react";

export function useAllRooms() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        fetch('http://localhost:8080/room/all')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setRooms(data)
                setIsLoading(false);
            })
            .catch(error => console.error(error));
    }, []);

    return {
        rooms, isLoading
    }
}