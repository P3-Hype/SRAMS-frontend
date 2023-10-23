import BasePage from '../components/BasePage/BasePage';
import { Container, LinearProgress, Paper, Stack, TextField, Typography } from '@mui/material';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import { useParams } from 'react-router-dom';

const page = (room: Room) => {
    return (
        <Paper>
            <Stack direction={"row"} alignItems={'flex-end'} gap={8}>
                <TextField sx={{flexGrow: 1}} label="Name" defaultValue={room.name} variant="standard" />
                <Typography variant="subtitle2" sx={{opacity:0.2}}>
                    {room.id}
                </Typography>
            </Stack>
        </Paper>
    )
}

export function EditRoomPage() {
    const alert = useAlert();
    const params = useParams<{ id: string }>();
    const { room, isLoading } = useRoom(params.id ?? "")

    return (
        <BasePage alert={alert}>
            <Container>
                {isLoading
                    ?
                    <LinearProgress />
                    :
                    room
                        ?
                        page(room)
                        :
                        <Typography>
                            Room not found
                        </Typography>
                }

            </Container>
        </BasePage>
    );
};

export default EditRoomPage;
