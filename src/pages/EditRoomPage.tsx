import BasePage from '../components/BasePage/BasePage';
import { Autocomplete, Checkbox, Card, Container, LinearProgress, Paper, Stack, TextField, Typography, useTheme, IconButton, Theme, Fade, Box } from '@mui/material';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ViewListRounded } from '@mui/icons-material';
import Room from '../room';
import { Link as RouterLink } from 'react-router-dom';
import SaveButton from '../components/SaveButton/SaveButton';
import axios from 'axios';
import { useMutation } from 'react-query';

function EditRoomContent(props: { room: Room, theme: Theme, labels: string[] }) {
    const theme = props.theme;
    const room = props.room;
    const labels = props.labels;
    const [roomMutation, setRoomMutation] = useState<Room>(room);
    const [isLoading, setIsloading] = useState(false);
    const mutation = useMutation({
        mutationFn: (room:Room) => {
            setIsloading(true);
            return axios.put(`${import.meta.env.VITE_SRAMS_API_ADDRESS}room/updateRoom`, room);
        },
        onSuccess: () => {
            setIsloading(false);
        },
    });
    const mutate = () => {
        setIsloading(true);
        mutation.mutate(room);
    }

    //set initatl room state
    useEffect(() => {
        setRoomMutation(room);
    }, [room])

    return (
        <Card sx={{ padding: 4 }}>
            <Stack direction={"column"} gap={2}>
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
                    <SaveButton saveHandler={mutate} isLoading={isLoading} />
                    <IconButton component={RouterLink} to="/admin">
                        <ViewListRounded />
                    </IconButton>
                </Stack>
                <Typography variant="subtitle2" sx={{ opacity: 0.2 }}>
                    {room.id}
                </Typography>
                <Stack direction={"row"} alignItems={'flex-end'} gap={8}>
                    <Checkbox defaultChecked={room.hasWindow} />
                </Stack>
                <Autocomplete
                    PaperComponent={({ children }) => (
                        <Paper sx={{ border: "1px solid " + theme.palette.primary.main, marginTop: 1 }}>
                            {children}
                        </Paper>
                    )}
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
    const theme = useTheme();
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
                                    theme={theme}
                                    labels={labels}/>
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
