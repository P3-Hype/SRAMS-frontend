import { Divider, Grid, Paper, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import { Box, alpha } from '@mui/system';
import { useEffect, useRef, useState } from 'react';
import Booking from '../../booking';
import useBookings from '../../hooks/useBooking';
import { useAllRooms } from '../../hooks/useRoom';
import Room from '../../room';
import { Clock, ClockLater } from '../Clock/Clock';

function calculatePosition(
	startUnix: number,
	endUnix: number,
	rowWidth: number,
	startSpanUnix: number,
	endSpanUnix: number
) {
	const start = startUnix - startSpanUnix;
	const end = endUnix - startSpanUnix;
	const span = endSpanUnix - startSpanUnix;

	const startPercent = start / span;
	const endPercent = end / span;

	const startOffset = Math.round(startPercent * rowWidth);
	const endOffset = Math.round(endPercent * rowWidth);

	return { startOffset, endOffset };
}

interface BookingBoxProps {
	booking: Booking;
	rowWidth: number;
	startUnix: number;
	endUnix: number;
}

function BookingBox(props: BookingBoxProps) {
	const [pos, setPos] = useState({ startOffset: 0, endOffset: 0 });

	useEffect(() => {
		setPos(
			calculatePosition(
				props.booking.startTime,
				props.booking.endTime,
				props.rowWidth,
				props.startUnix,
				props.endUnix
			)
		);
	}, [props.booking, props.rowWidth, props.startUnix, props.endUnix]);

	// Format the start and end time
	const startTimeDate = new Date(props.booking.startTime);
	const endTimeDate = new Date(props.booking.endTime);
    const startTime = startTimeDate.getTime() > props.startUnix ? startTimeDate.toTimeString().substring(0, 5) : null;
    const endTime = endTimeDate.getTime() < props.endUnix ? endTimeDate.toTimeString().substring(0, 5) : null;


	return (
		<Box
			borderRadius={1}
			height={'100%'}
			width={pos.endOffset + 'px'}
			position={'absolute'}
			sx={{
				backgroundColor: 'info.main',
				transform: `translateX(${pos.startOffset}px)`,
				transition: 'transform 0.2s ease-in-out',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Typography color={"info.contrastText"} ml={1}>{startTime ? startTime : ""}</Typography>
			<Typography color={"info.contrastText"} mr={1}>{endTime ? endTime : ""}</Typography>
		</Box>
	);
}

interface CalendarRowProps {
	room: Room;
	bookings: Booking[];
}

function CalendarRow(props: CalendarRowProps) {
	const theme = useTheme();
	const rowRef = useRef<HTMLDivElement>(null);
	const [rowWidth, setRowWidth] = useState(0);
	const [span] = useState(3);
	const [spanOffsetHours] = useState(0);
	const [startUnix, setStartUnix] = useState(new Date().getTime());
	const [endUnix, setEndUnix] = useState(0);
	const [updateInterval, setUpdateInterval] = useState<NodeJS.Timeout>();

	const [rowReady, setRowReady] = useState(false);

	const updateSpan = () => {
		setStartUnix(new Date().getTime() - spanOffsetHours * 60 * 60 * 1000);
		setEndUnix(startUnix + span * 60 * 60 * 1000);
		setRowReady(true);
	};

	useEffect(() => {
		updateSpan();
		clearInterval(updateInterval ?? 0);
		setUpdateInterval(setInterval(updateSpan, 1000));
	}, []);

	useEffect(() => {
		setRowWidth(rowRef.current?.clientWidth ?? 0);
	}, [rowRef.current?.clientWidth]);

	const gradientStart = theme.palette.background.default;
	const gradientEnd = alpha(theme.palette.background.paper, 0.0);
	return (
		<Grid container spacing={3}>
			<Grid item xs={1.5} overflow={'hidden'} textOverflow={'clip'}>
				<Typography variant='h6' textOverflow={'ellipsis'} noWrap>
					{props.room.name}
				</Typography>
			</Grid>
			<Grid item xs>
				<Stack
					ref={rowRef}
					direction={'row'}
					height={'100%'}
					position={'relative'}
					overflow={'hidden'}
					borderRadius={1}
				>
					<Box
						position={'absolute'}
						height={'100%'}
						width={'100%'}
						sx={{
							background: `linear-gradient(90deg, ${gradientStart} 0%, ${gradientEnd} 30%);`,
						}}
					></Box>
					{rowReady &&
						props.bookings
							.filter((b) => b.endTime > startUnix && b.startTime < endUnix)
							.map((booking) => (
								<BookingBox
									key={booking.id}
									booking={booking}
									rowWidth={rowWidth}
									startUnix={startUnix}
									endUnix={endUnix}
								/>
							))}
				</Stack>
			</Grid>
		</Grid>
	);
}

interface CalendarProps {
	rooms: Room[];
	bookings: Booking[];
}

function Calendar(props: CalendarProps) {
	return (
		<Stack padding={3} gap={1}>
			<Grid container spacing={3}>
				<Grid item xs={1.5} overflow='hidden' textOverflow='clip' sx={{ fontSize: '1.5rem' }}>
					Rooms:
				</Grid>
				<Grid item>
					<Clock />
				</Grid>
				<Grid item xs /> {/* Empty item as a spacer */}
				<Grid item>
					<ClockLater />
				</Grid>
			</Grid>
			<Divider />
			{props.rooms.map((room) => {
				const bookingsOfRoom = props.bookings.filter((booking) => booking.roomId == room.id);
				return (
					<>
						<CalendarRow key={room.id} room={room} bookings={bookingsOfRoom} />
						<Divider />
					</>
				);
			})}
		</Stack>
	);
}

function DashboardCalendar() {
	const { rooms, isLoading: roomsLoading } = useAllRooms();
	const { bookings, isLoading: bookingsLoading } = useBookings();

	return (
		<Paper
			sx={{
				width: '100%',
				height: '100%',
                overflow: 'hidden',
			}}
		>
			{roomsLoading || bookingsLoading ? (
				<Skeleton variant='rounded' width='100%' height='100%' />
			) : (
				<Calendar rooms={rooms ?? []} bookings={bookings ?? []} />
			)}
		</Paper>
	);
}

export default DashboardCalendar;
