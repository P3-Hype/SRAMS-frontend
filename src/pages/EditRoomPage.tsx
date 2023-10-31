import { DeleteForeverRounded, ViewListRounded } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Card,
	Checkbox,
	Container,
	Fade,
	IconButton,
	LinearProgress,
	Paper,
	Slider,
	Stack,
	TextField,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import BasePage from '../components/BasePage/BasePage';
import SaveButton from '../components/SaveButton/SaveButton';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import Room from '../room';
import RoomInformation from '../components/RoomInformation/RoomInformation';
import { MetricLink } from '../metricLink';

function AutoCompleteDropdown(props: { readonly children?: React.ReactNode }) {
	const theme = useTheme();
	return (
		<Paper
			sx={{
				border: '1px solid ' + theme.palette.primary.main,
				marginTop: 1,
			}}
		>
			{props.children}
		</Paper>
	);
}

function EditRoomContent(props: { readonly room: Room; readonly labels: string[] }) {
	const room = props.room;
	const labels = props.labels;
	const [mutatedRoom, setMutatedRoom] = useState<Room>(room);
	const [isLoading, setIsloading] = useState(false);
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const metricLinks = useQuery(['roomMetricLinks', props.room.id], {
		queryFn: async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}metricLink/getAllByRoomId`, {
				params: {
					roomId: props.room.id,
				},
			});
			return data as MetricLink[];
		},
	});
	
	const updateRoomMutation = useMutation({
		mutationFn: (room: Room) => {
			setIsloading(true);
			return axios.put(`${import.meta.env.VITE_SRAMS_API_ADDRESS}room/updateRoom`, room);
		},
		onSuccess: () => {
			setIsloading(false);
		},
	});
	
	const mutate = () => {
		updateRoomMutation.mutate(mutatedRoom);
	};

	const deleteRoomMutation = useMutation(
		(id: string) =>
			axios.delete(`${import.meta.env.VITE_SRAMS_API_ADDRESS}room/deleteRoom`, {
				params: { roomId: id },
			}),
		{
			onSuccess: () => {
				console.log('Room deleted');
				queryClient.invalidateQueries('allRooms');
				navigate('/admin');
			},
		}
	);
	const handleDelete = () => {
		deleteRoomMutation.mutate(room.id);
	};

	//set initatl room state
	useEffect(() => {
		setMutatedRoom(room);
	}, [room]);

	return (
		<Card sx={{ padding: 4, overflow: 'visible' }}>
			<Stack direction={'column'} gap={4}>
				<Stack direction={'row'} alignItems={'flex-start'} gap={2}>
					<TextField
						sx={{ flexGrow: 1 }}
						onChange={(e) => {
							const r = mutatedRoom;
							r.name = e.target.value;
							setMutatedRoom(r);
						}}
						label='Name'
						defaultValue={room.name}
						variant='standard'
					/>
					<IconButton onClick={handleDelete}>
						<DeleteForeverRounded color='error' />
					</IconButton>
					<SaveButton saveHandler={mutate} isLoading={isLoading} />
					<IconButton component={RouterLink} to='/admin'>
						<ViewListRounded />
					</IconButton>
				</Stack>
				<Typography variant='subtitle2' sx={{ opacity: 0.2 }}>
					{room.id}
				</Typography>
				<Stack direction={'row'} alignItems={'center'} gap={2}>
					<TextField
						type='number'
						defaultValue={room.seatCount}
						label='Number of seats'
						variant='outlined'
						onChange={(e) => {
							const r = mutatedRoom;
							r.seatCount = parseInt(e.target.value);
							setMutatedRoom(r);
						}}
					/>
					<Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
						<Checkbox
							defaultChecked={room.hasWindow}
							onChange={(e) => {
								const r = mutatedRoom;
								r.hasWindow = e.target.checked;
								setMutatedRoom(r);
							}}
						/>
						<Typography ml={1.5} variant='body1'>
							Room has a window
						</Typography>
					</Box>
				</Stack>
				<Stack direction={'row'} minHeight={'fit-content'} alignItems={'center'} gap={8}>
					
					<Slider
						sx={{ minHeight: '12rem' }}
						disabled={!room.hasTemperature}
						orientation='vertical'
						defaultValue={[20, 23]}
						valueLabelDisplay='auto'
						valueLabelFormat={(value) => value + ' °C'}
						min={15}
						max={30}
					/>
					<Slider
						sx={{ minHeight: '12rem' }}
						disabled={!room.hasHumidity}
						orientation='vertical'
						defaultValue={[40, 70]}
						valueLabelDisplay='auto'
						valueLabelFormat={(value) => value + '%'}
						min={0}
						max={100}
					/>
					<Slider
						sx={{ minHeight: '12rem' }}
						disabled={!room.hasCo2}
						orientation='vertical'
						defaultValue={800}
						valueLabelDisplay='auto'
						valueLabelFormat={(value) => value + ' PPM'}
						min={400}
						step={100}
						max={5000}
					/>
				</Stack>
				<Autocomplete
					PaperComponent={AutoCompleteDropdown}
					options={labels}
					renderInput={(params) => <TextField {...params} label='Prom label' />}
				/>
				<RoomInformation room={room} />
			</Stack>
		</Card>
	);
}

function Content() {
	const params = useParams<{ id: string }>();
	const { room, isLoading } = useRoom(params.id ?? '');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [labels] = useState<string[]>([]);

	if (isLoading) return <LinearProgress />;
	if (room == null || room == undefined) {
		return <Typography> Room not found </Typography>;
	}

	return (
		<Fade in timeout={200}>
			<Box>
				<EditRoomContent room={room} labels={labels} />
			</Box>
		</Fade>
	);
}

export function EditRoomPage() {
	const alert = useAlert();

	return (
		<BasePage alert={alert}>
			<Container>
				<Content />
			</Container>
		</BasePage>
	);
}

export default EditRoomPage;
