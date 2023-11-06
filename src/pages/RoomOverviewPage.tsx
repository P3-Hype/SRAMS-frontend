import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import { LinearProgress } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Booking from '../booking';
import useAlert from '../hooks/useAlert';
import useAllBookings from '../hooks/useBooking';
import { useAllRooms } from '../hooks/useRoom';
import Room from '../room';

interface Resource {
	id: string;
	title: string;
}

interface Event {
	id: string;
	start: string;
	end: string;
	resourceId: string;
	title: string;
}

function convertTimestampToTime(timestamp: number) {
	const date = new Date(timestamp * 1000);
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
	};
	return date.toLocaleTimeString('da-DK', options);
}

function getRoomsWithBookings(allRooms: Room[], bookings: Booking[]) {
	let roomsWithBookings: { room: Room; bookings: Booking[] }[] = [];
	allRooms.forEach((room: Room) => {
		const bookingsInRoom = bookings.filter((booking: Booking) => booking.roomId === room.id);
		roomsWithBookings.push({
			room: room,
			bookings: bookingsInRoom,
		});
	});
	return roomsWithBookings;
}

const MyFullCalendarComponent = () => {
	const calendarRef = useRef(null);
	const alert = useAlert();
	const allBookings = useAllBookings();
	const allRooms = useAllRooms();

	const [resources, setResources] = useState<Resource[]>([]);
	const [events, setEvents] = useState<Event[]>([]);

	const roomsWithBookings = getRoomsWithBookings(allRooms.rooms || [], allBookings.bookings || []);

	useEffect(() => {
		const newResources: Resource[] = roomsWithBookings.map(({ room }) => ({
			id: room.id.toString(),
			title: room.name,
		}));
		setResources(newResources);

		const newEvents: Event[] = roomsWithBookings.flatMap(({ room, bookings }: any) =>
			bookings.map((booking: { id: { toString: () => any }; startTime: number; endTime: number }) => ({
				id: booking.id.toString(),
				start: new Date(booking.startTime * 1000).toISOString(),
				end: new Date(booking.endTime * 1000).toISOString(),
				resourceId: room.id.toString(),
				title: `Booking ${booking.id}`,
			}))
		);
		setEvents(newEvents);
	}, [roomsWithBookings]);

	if (allBookings.isLoading) {
		return <LinearProgress />;
	}

	return (
		<FullCalendar
			plugins={[resourceTimelinePlugin]}
			ref={calendarRef}
			timeZone='UTC'
			initialView='resourceTimelineDay'
			aspectRatio={1.5}
			headerToolbar={{
				left: 'prev,next',
				center: 'title',
				right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
			}}
			editable={true}
			resourceAreaHeaderContent='Rooms'
			resources={resources}
			events={events}
		/>
	);
};

export default MyFullCalendarComponent;
