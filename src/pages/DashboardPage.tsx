import { useQuery } from "react-query";
import BasePage from "../components/BasePage/BasePage";
import axios from "axios";
import useAlert from "../hooks/useAlert";
import { RoomSuggestion } from "../room";
import { Box, Card, Stack, Typography, useTheme } from "@mui/material";
import MiniGauge from "../components/MiniGauge/MiniGauge";
import { lerpColor } from "../utils/colorUtil";
import { TransitionGroup } from 'react-transition-group';
import { Grow } from "@mui/material";

function RoomSuggestionCard(props: { readonly roomSuggestion: RoomSuggestion }) {
    const room = props.roomSuggestion.room;
    const theme = useTheme();

    const climateColor = props.roomSuggestion.climateScore <= 0.5
    ? lerpColor(theme.palette.success.main, theme.palette.warning.main, props.roomSuggestion.climateScore)
    : lerpColor(theme.palette.warning.main, theme.palette.error.main, props.roomSuggestion.climateScore);

    return (
        <Grow in>
            <Card sx={{padding: 2, outline: "2px solid", outlineColor: climateColor}}>
                <Stack direction={"row"} gap={2}>
                    <Stack direction={"column"}>
                        <Typography variant="h6" minWidth={"12rem"}>{room.name}</Typography>
                        <Typography>{props.roomSuggestion.availabilityTime}m</Typography>
                    </Stack>
                    <MiniGauge value={props.roomSuggestion.climateScore} color={climateColor}/>
                </Stack>
            </Card>
        </Grow>
    )
}

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
        return <div>Loading...</div>
    }

    if (suggestedRooms.data === undefined) return <></>

    return (
        <Box margin={4}>
            <Stack direction={"row"} gap={2} flexWrap={"wrap"} component={TransitionGroup}>
                {suggestedRooms.data.map((suggestedRoom) => <Grow><Box key={suggestedRoom.room.id}><RoomSuggestionCard roomSuggestion={suggestedRoom} /></Box></Grow>)}
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