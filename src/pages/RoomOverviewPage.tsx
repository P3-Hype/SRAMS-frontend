import { Box, Container, Typography } from '@mui/material';
import Booking from '../booking';
import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';
import useAllBookings from '../hooks/useBooking';
import { useAllRooms } from '../hooks/useRoom';
import Room from '../room';

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

function RoomOverviewPage() {
	const alert = useAlert();
	const allBookings = useAllBookings();
	const allRooms = useAllRooms();

	const roomsWithBookings = getRoomsWithBookings(allRooms.rooms || [], allBookings.bookings || []);

	return (
		<BasePage alert={alert}>
			<Container>
				<Typography variant='h5'>Room Overview</Typography>
				{roomsWithBookings.map((roomWithBooking) => (
					<Box key={roomWithBooking.room.id} display='flex' alignItems='center'>
						<Box
							border='1px solid black'
							bgcolor='white'
							width='100%'
							height={50}
							mx={2}
							position='relative'
							m={1}
						>
							<Typography
								variant='h6'
								position='absolute'
								top={0}
								left={0}
								bgcolor='rgba(255, 255, 255, 0.8)'
								p={1}
								zIndex={1}
							>
								{roomWithBooking.room.name}
							</Typography>

							{roomWithBooking.bookings.map((booking) => {
								const startPercentage = ((Number(booking.startTime) % 86400) / 86400) * 100;
								const durationPercentage =
									((Number(booking.endTime) - Number(booking.startTime)) / 86400) * 100;

								return (
									<Box
										key={booking.id}
										bgcolor='red'
										position='absolute'
										left={`${startPercentage}%`}
										width={`${durationPercentage}%`}
										height='100%'
										display='flex'
										flexDirection='column'
										justifyContent='center'
										alignItems='center'
										color='white'
									>
										<Typography variant='body2'>
											{convertTimestampToTime(Number(booking.startTime))}
										</Typography>
										<Typography variant='body2'>
											{convertTimestampToTime(Number(booking.endTime))}
										</Typography>
									</Box>
								);
							})}
						</Box>
					</Box>
				))}
			</Container>
		</BasePage>
	);
}

export default RoomOverviewPage;
