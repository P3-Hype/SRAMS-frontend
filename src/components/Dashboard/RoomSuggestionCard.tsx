import { Box, Card, Grow, Stack, Typography, useTheme } from "@mui/material";
import { lerpColor } from "../../utils/colorUtil";
import { RoomSuggestion } from "../../room";
import MiniGauge from "../MiniGauge/MiniGauge";
import { CloudTwoTone, SentimentVeryDissatisfiedTwoTone, WarningTwoTone } from "@mui/icons-material";

function RoomSuggestionCard(props: { readonly roomSuggestion: RoomSuggestion }) {
    const room = props.roomSuggestion.room;
    const theme = useTheme();

    const climateColor = Math.min(props.roomSuggestion.climateScore, 1) <= 0.5
    ? lerpColor(theme.palette.success.main, theme.palette.warning.main, props.roomSuggestion.climateScore)
    : lerpColor(theme.palette.warning.main, theme.palette.error.main, props.roomSuggestion.climateScore);
    const critical = props.roomSuggestion.climateScore >= 0.5;

    const iconStyles = {
            color: climateColor,
            position: "absolute",
            marginBottom: "-0.5rem",
            animation: critical ? "pulsate 1s ease-in-out infinite" : ""
        }

    //TODO: change icon from cloud to autoicon if bad metrics
    return (
        <Grow in>
            <Card sx={{padding: 2, outline: "2px solid", outlineColor: climateColor}}>
                <Stack direction={"row"} gap={2}>
                    <Stack direction={"column"}>
                        <Typography variant="h6" minWidth={"12rem"}>{room.name}</Typography>
                        {props.roomSuggestion.availabilityTime != -1 
                            ? <Typography>{props.roomSuggestion.availabilityTime}m</Typography>
                            : <Typography color={theme.palette.primary.light}>is available</Typography>}
                    </Stack>
                    <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"flex-end"} >
                        <MiniGauge value={props.roomSuggestion.climateScore} color={climateColor}/>
                        {props.roomSuggestion.climateScore > 7.5
                            ? <SentimentVeryDissatisfiedTwoTone sx={iconStyles} />
                            : props.roomSuggestion.climateScore > 0.5
                            ? <WarningTwoTone sx={iconStyles} />
                            : <CloudTwoTone sx={iconStyles} />}
                        
                    </Box>
                </Stack>
            </Card>
        </Grow>
    )
}

export default RoomSuggestionCard;