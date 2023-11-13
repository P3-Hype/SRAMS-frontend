import { DeleteForeverRounded, Link, ViewListRounded } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Button,
	Card,
	Checkbox,
	Chip,
	Container,
	Divider,
	Fade,
	Grow,
	IconButton,
	LinearProgress,
	Paper,
	Stack,
	TextField,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import BasePage from '../components/BasePage/BasePage';
import MetricAutoIcon from '../components/MetricAutoIcon/MetricAutoIcon';
import MetricSlider from '../components/MetricLimitSlider/MetricLimitSlider';
import RoomInformation from '../components/RoomInformation/RoomInformation';
import SaveButton from '../components/SaveButton/SaveButton';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import { MetricLink, MetricType } from '../metricLink';
import Room from '../room';
import theme from '../theme';
import { LabelToMetricType } from '../utils/prometheusUtil';
import DeleteConformation from '../components/DeleteConformation/DeleteConformation';

function AutoCompleteDropdown(props: { readonly children?: React.ReactNode }) {
	const theme = useTheme();
	return (
		<Grow in>
			<Paper
				sx={{
					border: '1px solid ' + theme.palette.primary.main,
					marginTop: 1,
					marginBottom: 1,
				}}
			>
				{props.children}
			</Paper>
		</Grow>
	);
}

function LinkMetricToRoomInput(props: { readonly room: Room }) {
	const theme = useTheme();
	const queryClient = useQueryClient();
	const room = props.room;
	const [metricsToAdd, setMetricsToAdd] = useState<string[]>([]);
	const { data, isLoading } = useQuery(['allLabels'], {
		queryFn: async () => {
			const { data } = await axios.get(
				`${import.meta.env.VITE_SRAMS_API_ADDRESS}metricLink/getAvailableMetricSources`
			);
			return data as string[];
		},
	});

	const addLinkMutation = useMutation(
		() =>
			axios.post(`${import.meta.env.VITE_SRAMS_API_ADDRESS}metricLink/addMetricLinks`, {
				roomId: room.id,
				metrics: metricsToAdd.map((m) => {
					const arr = m.split('_');
					const id = arr[0];
					arr.shift();
					const type = arr.join('_').toUpperCase();
					return { id, type };
				}),
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries(['roomMetricLinks', room.id]);
			},
		}
	);

	return (
		<Stack direction={'row'} gap={1}>
			<Autocomplete
				sx={{ flexGrow: 1 }}
				PaperComponent={AutoCompleteDropdown}
				multiple
				options={isLoading ? ['Loading...'] : data ?? []}
				renderInput={(params) => <TextField {...params} label='Add metric sources' />}
				autoHighlight
				filterSelectedOptions
				value={metricsToAdd}
				onChange={(_, value) => {
					setMetricsToAdd(value);
				}}
				renderTags={(value: readonly string[], getTagProps) =>
					value.map((option: string, index: number) => {
						const metricType = MetricType[LabelToMetricType(option) as keyof typeof MetricType];
						return (
							<Chip
								sx={{ paddingLeft: 1 }}
								icon={
									<MetricAutoIcon tooltip color={theme.palette.primary.light} metric={metricType} />
								}
								label={option}
								{...getTagProps({ index })}
							/>
						);
					})
				}
			/>
			<Tooltip arrow placement='bottom-end' title='Link selected metrics to room'>
				<Button
					color={'success'}
					variant='outlined'
					onClick={() => {
						setMetricsToAdd([]);
						addLinkMutation.mutate();
					}}
				>
					<Link />
				</Button>
			</Tooltip>
		</Stack>
	);
}

function EditRoomContent(props: { readonly room: Room }) {
	const room = props.room;
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
	const co2MetricLink = metricLinks.data?.find((ml) => ml.type == MetricType.CO2_LEVEL);
	const temperatureMetricLink = metricLinks.data?.find((ml) => ml.type == MetricType.TEMPERATURE);
	const humidityMetricLink = metricLinks.data?.find((ml) => ml.type == MetricType.HUMIDITY);

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
					<DeleteConformation handleDelete={handleDelete}></DeleteConformation>
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
					<Box display={'flex'} flexDirection={'row'} alignItems={'left'}>
						<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
							<Checkbox
								defaultChecked={room.hasWindow}
								onChange={(e) => {
									const r = mutatedRoom;
									r.hasWindow = e.target.checked;
									setMutatedRoom(r);
								}}
							/>
							<Typography variant='body1'>Room has a window</Typography>
						</Box>

						<Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
							<Checkbox
								defaultChecked={room.isBookable}
								onChange={(e) => {
									const r = mutatedRoom;
									r.isBookable = e.target.checked;
									setMutatedRoom(r);
								}}
							/>
							<Typography variant='body1'>Room is bookable</Typography>
						</Box>
					</Box>
				</Stack>
				<Stack>
					<Typography variant='caption' color={theme.palette.primary.light}>
						Metrics
					</Typography>
					<Divider />
				</Stack>
				{!metricLinks.isLoading && (
					<Stack direction={'row'} minHeight={'fit-content'} alignItems={'center'} gap={8}>
						<MetricSlider type={MetricType.CO2_LEVEL} metricLink={co2MetricLink} />
						<MetricSlider type={MetricType.TEMPERATURE} metricLink={temperatureMetricLink} />
						<MetricSlider type={MetricType.HUMIDITY} metricLink={humidityMetricLink} />
					</Stack>
				)}
				<LinkMetricToRoomInput room={room} />
				<RoomInformation metricLinks={metricLinks} />
			</Stack>
		</Card>
	);
}

function Content() {
	const params = useParams<{ id: string }>();
	const { room, isLoading } = useRoom(params.id ?? '');

	if (isLoading) return <LinearProgress />;
	if (room == null || room == undefined) {
		return <Typography> Room not found </Typography>;
	}

	return (
		<Fade in timeout={200}>
			<Box>
				<EditRoomContent room={room} />
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