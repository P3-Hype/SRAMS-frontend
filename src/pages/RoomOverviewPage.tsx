// Importerer de nødvendige biblioteker og komponenter
import { Box, Card, CardContent, Container, LinearProgress, Typography } from '@mui/material';
import Booking from '../booking';
import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';
import useAllBookings from '../hooks/useBooking';
import { useAllRooms } from '../hooks/useRoom';
import Room from '../room';

// Konverterer Unix-timestamp til dansk tid
function convertTimestampToTime(timestamp: number) {
	const date = new Date(timestamp * 1000);
	const options: Intl.DateTimeFormatOptions = {
		hour: '2-digit',
		minute: '2-digit',
	};
	return date.toLocaleTimeString('da-DK', options);
}

// Finder alle værelser og deres tilknyttede reservationer
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

// Viser den aktuelle tidslinje
function CurrentTimeLine() {
	const date = new Date();
	const currentTime = date.getHours() + date.getMinutes() / 60;
	const currentPercentage = (currentTime / 24) * 100;

	return (
		<Box
			position='absolute'
			left={`${currentPercentage}%`}
			width='2px'
			height='100%'
			bgcolor='black'
			zIndex={3}
		></Box>
	);
}

// Opretter en tilpasset tidslinje
function CustomTimeLine() {
	const timeLine = [];
	const timeSlotWidth = 100 / 24;

	for (let i = 0; i < 24; i++) {
		timeLine.push(
			<Card
				key={i}
				sx={{
					width: `${timeSlotWidth}%`,
					height: '100%',
					position: 'relative',
					border: '1px solid black',
				}}
			>
				<CardContent
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100%',
					}}
				>
					<Typography variant='body2' bgcolor='white' p={1}>
						{i.toString().padStart(2, '0')}:00
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Box display='flex' alignItems='center' height={50} mx={2} position='relative' m={1}>
			{timeLine}
		</Box>
	);
}
type BookingProps = {
	booking: any; // Erstat "any" med den faktiske type for "booking"
};

// Opretter og viser en enkelt reservation
function BookingComponent({ booking }: BookingProps) {
	const startTime = new Date(booking.startTime * 1000);
	const endTime = new Date(booking.endTime * 1000);
	const startHour = startTime.getHours();
	const startMinute = startTime.getMinutes();
	const endHour = endTime.getHours();
	const endMinute = endTime.getMinutes();
	const startPercentage = ((startHour + startMinute / 60) / 24) * 100;
	const durationPercentage = ((endHour + endMinute / 60 - startHour - startMinute / 60) / 24) * 100;

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
			<Typography variant='body2'>{convertTimestampToTime(booking.startTime)}</Typography>
			<Typography variant='body2'>{convertTimestampToTime(booking.endTime)}</Typography>
		</Box>
	);
}

// Hovedkomponenten der samler det hele
function RoomOverviewPage() {
	const alert = useAlert();
	const allBookings = useAllBookings();
	const allRooms = useAllRooms();
	const roomsWithBookings = getRoomsWithBookings(allRooms.rooms || [], allBookings.bookings || []);
	const customTimeline = <CustomTimeLine></CustomTimeLine>;

	if (allBookings.isLoading) {
		return <LinearProgress />;
	}

	return (
		<BasePage alert={alert}>
			<Container>
				<Typography variant='h5'>Room Overview</Typography>
				{customTimeline}
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
							{roomWithBooking.bookings.map((booking: Booking) => (
								<BookingComponent key={booking.id} booking={booking} />
							))}

							<CurrentTimeLine />
						</Box>
					</Box>
				))}
			</Container>
		</BasePage>
	);
}

export default RoomOverviewPage;
