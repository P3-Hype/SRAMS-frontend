import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Card, Container, IconButton, LinearProgress, Stack, Tooltip, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useAllRooms } from '../hooks/useRoom';
import { Co2, Thermostat, WaterDropTwoTone, DirectionsWalk } from '@mui/icons-material';
import Room from '../room';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from 'react-query';

function Content() {
	const theme = useTheme();
	const allRooms = useAllRooms();
	const navigate = useNavigate();
	const addRoomMutation = useMutation(() => axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}room/addRoom`), {
		onSuccess(data) {
			console.log('Room added', data);
			navigate('/room/' + data.data);
		},
	});

	const handleAddRoom = () => {
		addRoomMutation.mutate();
	};
	if (allRooms.isLoading) {
		return <LinearProgress />;
	}
	if (allRooms == undefined || allRooms.rooms?.length === 0) {
		return <Typography>No rooms found</Typography>;
	}

	return (
		<>
			<Card sx={{ mb: 2 }}>
				{allRooms.rooms?.map((r: Room) => (
					<Accordion key={r.id}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							sx={{ width: '100%' }}
							aria-controls='panel1a-content'
							id='panel1a-header'
						>
							{r.name ? (
								<Typography>{r.name}</Typography>
							) : (
								<Typography color={theme.palette.warning.light}>Room {r.id}</Typography>
							)}
							<Stack
								mr={2}
								direction={'row-reverse'}
								gap={2}
								sx={{
									alignItems: 'center',
								}}
							>
								<IconButton component={RouterLink} to={'/room/' + r.id}>
									<SettingsIcon />
								</IconButton>
								<Tooltip title='Co2'>
									<Co2 />
								</Tooltip>
								<Tooltip title='Temperature'>
									<Thermostat />
								</Tooltip>
								<Tooltip title='Humidity'>
									<WaterDropTwoTone />
								</Tooltip>
								<Tooltip title='Passive Infrared'>
									<DirectionsWalk />
								</Tooltip>
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<Typography>Her skal vi vel have nogle forskelige information omkring rummet.</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Card>
			<Button size='large' variant='contained' color='primary' fullWidth onClick={handleAddRoom}>
				<Typography textTransform={'none'} variant='h6'>
					Add room
				</Typography>
			</Button>
		</>
	);
}

function RoomAdministrationPage() {
	const alert = useAlert();
	return (
		<BasePage alert={alert}>
			<Container>
				<Content />
			</Container>
		</BasePage>
	);
}

export default RoomAdministrationPage;
