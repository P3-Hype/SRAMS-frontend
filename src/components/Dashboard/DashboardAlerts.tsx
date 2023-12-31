import {
	Alert,
	AlertTitle,
	Box,
	Fade,
	List,
	ListItem,
	Paper,
	Skeleton,
	Slide,
	Stack,
	Typography,
	useTheme,
} from '@mui/material';
import useAllEvents from '../../hooks/useEvents';
import SramsEvent, { EventType, eventToDescription } from '../../event';
import { TransitionGroup } from 'react-transition-group';
import {alpha} from '@mui/system';
import { useRoom } from '../../hooks/useRoom';
import EventAutoIcon from '../AutoIcon/EventAutoIcon';

interface SramsAlertProps {
	readonly event: SramsEvent;
	readonly chipBackground: string;
}

function SramsAlert(props: SramsAlertProps) {
	const { room } = useRoom(props.event.roomId);
	const type = EventType[props.event.eventType as keyof typeof EventType];

	const severityColor = (type: EventType) => {
		switch (type) {
			case EventType.PRESENCE_LEFT:
				return 'info';
			case EventType.PRESENCE_NEW:
				return 'info';
			case EventType.CANCEL_BOOKING:
				return 'warning';
			case EventType.OPEN_BOOKING:
				return 'success';
			case EventType.CLOSE_WINDOW:
				return 'warning';
			case EventType.OPEN_WINDOW:
				return 'error';
			default:
				return 'info';
		}
	}

	return (
		<Alert
			severity={severityColor(type)}
			variant='standard'
			sx={{
				width: '100%',
				boxSizing: 'border-box',
				'& .MuiAlert-message': {
					width: '100%',
				},
			}}
		>
			<AlertTitle sx={{ width: '100%', display: 'flex' }}>
				<Stack width={'100%'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} gap={4}>
					{<Typography>{room?.name}</Typography> ?? <Skeleton variant='rounded' width={'4rem'} />}
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                        <Typography variant='body2'>{new Date(props.event.timeStamp).toLocaleTimeString()}</Typography>
                        <EventAutoIcon type={type} />
                    </Box>
				</Stack>
			</AlertTitle>
            <Typography variant='body2'>{eventToDescription(props.event)}</Typography>
		</Alert>
	);
}

function DashboardAlerts() {
	const { events, isLoading } = useAllEvents();
	const theme = useTheme();
	const gradientColors = [theme.palette.background.paper, alpha(theme.palette.background.paper, 0.0)];

	if (isLoading) return <Skeleton variant='rounded' height={'100%'} />;

	return (
		<Paper sx={{ display: 'flex', height: '100%', overflow: 'hidden' }}>
            <Fade in timeout={1000}>
                <List sx={{ flex: 1 }}>
                    <Box
                        sx={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            zIndex: 1,
                            background: `linear-gradient(0deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 25%)`,
                        }}
                    />
                        <TransitionGroup>
                            {events?.map((e) => (
                                <Slide key={e.id} direction='left' timeout={500}>
                                    <ListItem>
                                        <SramsAlert key={e.id} event={e} chipBackground={theme.palette.background.paper} />
                                    </ListItem>
                                </Slide>
                            ))}
                        </TransitionGroup>
                </List>
            </Fade>
		</Paper>
	);
}

export default DashboardAlerts;
