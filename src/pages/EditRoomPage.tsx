import BasePage from '../components/BasePage/BasePage';
import { Autocomplete, Checkbox, Button, Card, Container, LinearProgress, Paper, Stack, TextField, Typography, useTheme, IconButton, Theme } from '@mui/material';
import useAlert from '../hooks/useAlert';
import { useRoom } from '../hooks/useRoom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { SaveOutlined, ViewListRounded } from '@mui/icons-material';
import Room from '../room';
import {Link as RouterLink} from 'react-router-dom';

function EditRoomContent(props: {room: Room, theme:Theme, labels:string[]}) {
    const theme = props.theme;
    const room = props.room;
    const labels = props.labels;

    return (
        <Card sx={{padding: 4}}>
            <Stack direction={"column"} gap={2}>
                <Stack direction={"row"} alignItems={'flex-start'} gap={8}>
                    <TextField sx={{ flexGrow: 1 }} label="Name" defaultValue={room.name} variant="standard" />
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
                    <Paper sx={{ border: "1px solid " + theme.palette.primary.main , marginTop:1 }}>{children}</Paper>
                  )}
                options={labels}
                renderInput={(params) => <TextField {...params} label="Prom label" />}
                />
                <Button variant='outlined' color={"success"} sx={{width: 'fit-content', alignSelf: 'flex-end'}}>
                    <SaveOutlined /> Save
                </Button>
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
                    :
                    room
                        ?
                        <EditRoomContent room={room} theme={theme} labels={labels} />
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
