import { useQuery } from "react-query";
import BasePage from "../components/BasePage/BasePage";
import axios from "axios";
import useAlert from "../hooks/useAlert";
import { RoomSuggestion } from "../room";
import { Box, Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import { Grow } from "@mui/material";
import RoomSuggestionCard from "../components/Dashboard/RoomSuggestionCard";
import DashboardAlerts from "../components/Dashboard/DashboardAlerts";
import DashboardCalendar from "../components/Dashboard/DashboardCalendar";
import theme from "../theme";

function Content() {
    const suggestedRooms = useQuery('suggestedRooms', {
        queryFn: async () => {
            const { data }: {data:RoomSuggestion[]} = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}room/suggestions`)
            data.sort((a, b) => a.climateScore - b.climateScore);
            return data;
        },
        refetchInterval: 10000
    });



    if (suggestedRooms.isLoading === undefined) {
        return <LinearProgress />
    }

    if (suggestedRooms.data === undefined) return <></>

    return (
        <Box height={"100%"} >
            <Stack margin={4} gap={4} height={"100%"} maxHeight={"100%"}>
                <Box>
                    <Typography color={theme.palette.primary.light} variant="subtitle1">Suggested Rooms</Typography>
                    <Stack direction={"row"} gap={2} flexWrap={"wrap"} component={TransitionGroup}>
                        {suggestedRooms.data.map((suggestedRoom) => <Grow><Box key={suggestedRoom.room.id}><RoomSuggestionCard roomSuggestion={suggestedRoom} /></Box></Grow>)}
                    </Stack>
                </Box>
                <Grid container spacing={2} height={"100%"} maxHeight={"100%"}>
                    <Grid item flexGrow={3}>
                        <DashboardCalendar />
                    </Grid>
                    <Grid item flexGrow={1} maxHeight={"600px"}>
                        <DashboardAlerts />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}

function DashboardPage() {
    const alert = useAlert();

    return (
    <BasePage alert={alert}>
        <Content />
    </BasePage>
  );
}

export default DashboardPage;