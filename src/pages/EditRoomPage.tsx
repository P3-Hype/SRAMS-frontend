import BasePage from '../components/BasePage/BasePage';
import { Autocomplete, Checkbox, Card, Container, LinearProgress, Paper, Stack, TextField, Typography, useTheme, IconButton, Fade, Box, Slider } from '@mui/material';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DeleteForeverRounded, ViewListRounded } from '@mui/icons-material';
import Room from '../room';
import SaveButton from '../components/SaveButton/SaveButton';
import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';

function AutoCompleteDropdown(props: {children?: React.ReactNode}) {
    const theme = useTheme();
    return (
        <Paper sx={{ border: "1px solid " + theme.palette.primary.main, marginTop: 1 }}>
            {props.children}
        </Paper>
    )
}

function EditRoomContent(props: { 
    readonly room: Room, 
    readonly labels: string[] }) {

    const room = props.room;
    const labels = props.labels;
    const [roomMutation, setRoomMutation] = useState<Room>(room);
    const [isLoading, setIsloading] = useState(false);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
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
        updateRoomMutation.mutate(roomMutation);
    }

    const deleteRoomMutation = useMutation((id: string) => axios.delete(
        `${import.meta.env.VITE_SRAMS_API_ADDRESS}room/deleteRoom`,
        { params: { roomId: id } }
      ), {
        onSuccess: () => {
            console.log("Room deleted");
            queryClient.invalidateQueries("allRooms");
            navigate("/admin")
        }
      });
    const handleDelete = () => {
        deleteRoomMutation.mutate(room.id);
    }

    //set initatl room state
    useEffect(() => {
        setRoomMutation(room);
    }, [room])

    return (
        <Card sx={{ padding: 4, overflow: "visible" }}>
            <Stack direction={"column"} gap={4}>
                <Stack direction={"row"} alignItems={'flex-start'} gap={2}>
                    <TextField
                        sx={{ flexGrow: 1 }}
                        onChange={(e) => {
                            const r = roomMutation;
                            r.name = e.target.value;
                            setRoomMutation(r);
                        }}
                        label="Name"
                        defaultValue={room.name}
                        variant="standard" />
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverRounded color='error' />
                    </IconButton>
                    <SaveButton saveHandler={mutate} isLoading={isLoading} />
                    <IconButton component={RouterLink} to="/admin">
                        <ViewListRounded />
                    </IconButton>
                </Stack>
                <Typography variant="subtitle2" sx={{ opacity: 0.2 }}>
                    {room.id}
                </Typography>
                <Stack direction={"row"} alignItems={'center'} gap={2}>
                    <TextField
                        type='number'
                        defaultValue={room.seatCount}
                        label="Number of seats"
                        variant="outlined"
                        onChange={(e) => {
                            const r = roomMutation;
                            r.seatCount = parseInt(e.target.value);
                            setRoomMutation(r);
                        }} />
                    <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                        <Checkbox defaultChecked={room.hasWindow} onChange={(e) => {
                            const r = roomMutation;
                            r.hasWindow = e.target.checked;
                            setRoomMutation(r);
                        }} />
                        <Typography ml={1.5} variant="body1">
                            Room has a window
                        </Typography>
                    </Box>
                </Stack>
                <Stack direction={"row"} minHeight={"fit-content"} alignItems={'center'} gap={8}>
                    <Slider
                        sx={{ minHeight: "12rem" }}
                        disabled={!room.hasTemperature}
                        orientation='vertical'
                        defaultValue={[20, 23]}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value + " °C"}
                        min={15}
                        max={30}
                    />
                    <Slider
                        sx={{ minHeight: "12rem" }}
                        disabled={!room.hasHumidity}
                        orientation='vertical'
                        defaultValue={[40, 70]}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value + "%"}
                        min={0}
                        max={100}
                    />
                    <Slider
                        sx={{ minHeight: "12rem" }}
                        disabled={!room.hasCo2}
                        orientation='vertical'
                        defaultValue={800}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => value + " PPM"}
                        min={400}
                        step={100}
                        max={5000}
                    />
                </Stack >
                <Autocomplete
                    PaperComponent={AutoCompleteDropdown}
                    options={labels}
                    renderInput={(params) => <TextField {...params} label="Prom label" />}
                />
            </Stack>
        </Card>
    )
}

export function EditRoomPage() {
    const alert = useAlert();
    const params = useParams<{ id: string }>();
    const { room, isLoading } = useRoom(params.id ?? "")
    const [labels, setLabels] = useState<string[]>([]);

    return (
        <BasePage alert={alert}>
            <Container>
                {isLoading
                    ?
                    <LinearProgress />
                    : room
                    ?
                    <Fade in timeout={200}>
                        <Box>
                            <EditRoomContent
                                room={room}
                                labels={labels} />
                        </Box>
                    </Fade>
                    :
                    <Typography> Room not found </Typography>
                }
            </Container>
        </BasePage>
    );
}

export default EditRoomPage;
