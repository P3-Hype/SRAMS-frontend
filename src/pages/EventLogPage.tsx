import { useQuery } from 'react-query';
import BasePage from '../components/BasePage/BasePage';
import axios from 'axios';
import { Card, Container, Grid, Grow, LinearProgress, Stack, Typography } from '@mui/material';
import SramsEvent, { EventType } from '../event';
import useAlert from '../hooks/useAlert';
import { EventBusyTwoTone, Login, Logout, QuestionMarkTwoTone } from '@mui/icons-material';

function FormatUnix(unix: number) {
	const lenDiff = 13 - `${unix}`.length;
	if (lenDiff > 0) {
		unix *= 10 ** lenDiff;
	}
	return unix;
}

function EventTypeIcon(props: { readonly eventType: string }) {
	const type = EventType[props.eventType as keyof typeof EventType];
	console.log(props.eventType);

	if (type == EventType.PRESENCE_NEW) return <Login color='success' />;
	if (type == EventType.PRESENCE_LEFT) return <Logout color='error' />;
	if (type == EventType.CANCEL_BOOKING) return <EventBusyTwoTone color='warning' />;
	return <QuestionMarkTwoTone color='warning' />;
}

function EventCard(props: { readonly event: SramsEvent; readonly index: number }) {
	const event = props.event;
	const dateTime = new Date(event.timeStamp);

	return (
		<Grow in={true} timeout={props.index * 100}>
			<Card sx={{ padding: 2 }}>
				<Stack flexDirection={'row'} justifyContent={'space-between'}>
					<Grid container spacing={2}>
						<Grid item xs={1}>
							<EventTypeIcon eventType={props.event.eventType} />
						</Grid>
						<Grid item xs={5}>
							<Typography fontFamily={'Geist-UltraLight'}>room: {event.roomId}</Typography>
						</Grid>
						<Grid item xs={3}>
							<Typography>[{event.eventType}]</Typography>
						</Grid>
						<Grid item xs={2}>
							<Typography>
								{dateTime.getDate()} / {dateTime.getMonth() + 1}
							</Typography>
						</Grid>
						<Grid item xs={0}>
							<Typography>{dateTime.toLocaleTimeString('de')}</Typography>
						</Grid>
					</Grid>
				</Stack>
			</Card>
		</Grow>
	);
}

function EventLogPage() {
	const alert = useAlert();
	const { data: events, isLoading } = useQuery('allEvents', {
		queryFn: async () => {
			let { data: events }: { data: SramsEvent[] } = await axios.get(
				`${import.meta.env.VITE_SRAMS_API_ADDRESS}events/all`
			);
			events = events.map((e) => {
				e.timeStamp = FormatUnix(e.timeStamp);
				return e;
			});
			return events.sort((a, b) => b.timeStamp - a.timeStamp);
		},
		refetchInterval: 10 * 1000,
	});

	return (
		<BasePage alert={alert}>
			<Container>
				<Stack display={'flex'} flexDirection={'column'} gap={4}>				
					<Card sx={{ padding: 2 }}>
						<Stack>
							<Grid container spacing={2}>
								<Grid item xs={1}>
									<Typography>Type</Typography>
								</Grid>
								<Grid item xs={5}>
									<Typography>Room ID</Typography>
								</Grid>
								<Grid item xs={3}>
									<Typography>Event</Typography>
								</Grid>
								<Grid item xs={2}>
									<Typography>Date</Typography>
								</Grid>
								<Grid item xs={0}>
									<Typography>Time</Typography>
								</Grid>
							</Grid>
						</Stack>
					</Card>
					{isLoading ? (
						<LinearProgress />
					) : (
						events?.map((e: SramsEvent, i) => <EventCard key={e.id} event={e} index={i} />)
					)}
				</Stack>				

			</Container>
		</BasePage>
	);
}

export default EventLogPage;
