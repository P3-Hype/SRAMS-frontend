import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Card, Container, IconButton, LinearProgress, Stack, useTheme } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';
import { useAllRooms } from '../hooks/useRoom';
import Room from '../room';
import { MetricLink } from '../metricLink';
import MetricAutoIcon from '../components/AutoIcon/MetricAutoIcon';

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
	const {data: allMetrics, isLoading: metricsLoading} = useQuery('allMetrics', {
		queryFn: async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}metricLink/getAllMetricLinks`);
			return data as MetricLink[];
		}
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

	const handleAddSensor = () => {
		navigate('/datamock');
	};

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
								{(!metricsLoading && allMetrics != undefined) && <Stack direction={'row'} gap={1}>
									{allMetrics.filter(m => m.roomId == r.id).map(m => <MetricAutoIcon key={m.id} metric={m.type}/>)}
								</Stack>}
							</Stack>
						</AccordionSummary>
						<AccordionDetails>
							<Stack direction={'row'} gap={2}>
								<Typography variant='body2' color={theme.palette.primary.light}>Id: {r.id}</Typography>
							</Stack>
						</AccordionDetails>
					</Accordion>
				))}
			</Card>
			<Stack spacing={2}>
				<Button size='large' variant='contained' color='primary' fullWidth onClick={handleAddRoom}>
					<Typography textTransform={'none'} variant='h6'>
					Add Room
					</Typography>
				</Button>
				<Button size='large' variant='contained' color='primary' fullWidth onClick={handleAddSensor}>
					<Typography textTransform={'none'} variant='h6'>
					Sensor Setup
					</Typography>
				</Button>
			</Stack>
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
