import { Box, Container, Stack, Typography } from '@mui/material';
import BasePage from '../components/BasePage/BasePage';
import RoomStatusCard from '../components/RoomStatusCard/RoomStatusCard';
import Timeline from '../components/TimeClock/Timeline';
import useAlert from '../hooks/useAlert';

function RoomOverviewPage() {
	const alert = useAlert();
	const rooms = ['Room A', 'Room B'];

	return (
		<BasePage alert={alert}>
			<Container>
				<Typography>Suggestions:</Typography>
				<Stack spacing={2} direction='row' ml={4}>
					<RoomStatusCard />
					<RoomStatusCard />
					<RoomStatusCard />
				</Stack>
				<Box>
					<Timeline rooms={rooms} />
				</Box>
			</Container>
		</BasePage>
	);
}

export default RoomOverviewPage;
