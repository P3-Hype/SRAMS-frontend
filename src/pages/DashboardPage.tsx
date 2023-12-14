import { useQuery } from "react-query";
import BasePage from "../components/BasePage/BasePage";
import axios from "axios";
import useAlert from "../hooks/useAlert";
import { RoomSuggestion } from "../room";
import { Grow, Box, LinearProgress, Stack, Typography } from "@mui/material";
import { TransitionGroup } from 'react-transition-group';
import RoomSuggestionCard from "../components/Dashboard/RoomSuggestionCard";
import DashboardAlerts from "../components/Dashboard/DashboardAlerts";
import DashboardCalendar from "../components/Dashboard/DashboardCalendar";
import theme from "../theme";
import DashboardMap from "../components/Dashboard/DashboardMap";
import { useSearchParams } from "react-router-dom";

function Content({ currentView }: { readonly currentView: string }) {
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
            <Stack margin={4} gap={4} height={"100%"}>
                <Box>
                    <Typography color={theme.palette.primary.light} variant="subtitle1" mt={-2}>Suggestions</Typography>
                    <Stack direction={"row"} gap={2} flexWrap={"wrap"} component={TransitionGroup}>
                        {suggestedRooms.data.map((suggestedRoom) => <Grow key={suggestedRoom.room.id}><Box><RoomSuggestionCard roomSuggestion={suggestedRoom} /></Box></Grow>)}
                    </Stack>
                </Box>
                <Stack gap={2} display={"flex"} flexDirection={"row"} flexGrow={1} height={"0px"}>
                    {currentView === 'map' ? (
                        <Box flex={3}>
                            <DashboardMap />
                        </Box>
                    ) : currentView === 'grid' ? (
                        <Box flex={3}>
                            <DashboardCalendar />
                        </Box>
                    ) : null}
                    <Box flex={1}>
                        <DashboardAlerts />
                    </Box>
                </Stack>
            </Stack>
        </Box>
    )
}

function DashboardPage() {
    const alert = useAlert();
    const [searchParams] = useSearchParams();
    const currentView = searchParams.get('view');
    return (
    <BasePage alert={alert}>
        <Content currentView={currentView??'grid'} />
    </BasePage>
  );
}

export default DashboardPage;