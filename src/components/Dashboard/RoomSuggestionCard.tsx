import { Box, Card, Grow, Stack, Typography, useTheme } from "@mui/material";
import { lerpColor } from "../../utils/colorUtil";
import { RoomSuggestion } from "../../room";
import MiniGauge from "../MiniGauge/MiniGauge";
import { 
    SentimentVerySatisfiedTwoTone, 
    SentimentSatisfiedTwoTone, 
    SentimentNeutralTwoTone, 
    SentimentDissatisfiedTwoTone, 
    WarningTwoTone 
} from "@mui/icons-material";

function RoomSuggestionCard(props: { readonly roomSuggestion: RoomSuggestion }) {
    const room = props.roomSuggestion.room;
    const theme = useTheme();

    let climateColor;
    let critical;

    if (Math.min(props.roomSuggestion.climateScore, 1) <= 0.25) {
        climateColor = lerpColor(theme.palette.success.main, theme.palette.success.light, props.roomSuggestion.climateScore);
    } else if (Math.min(props.roomSuggestion.climateScore, 1) <= 0.5) {
        climateColor = lerpColor(theme.palette.success.light, theme.palette.warning.main, props.roomSuggestion.climateScore);
    } else if (Math.min(props.roomSuggestion.climateScore, 1) <= 0.75) {
        climateColor = lerpColor(theme.palette.warning.main, theme.palette.error.light, props.roomSuggestion.climateScore);
    } else if (Math.min(props.roomSuggestion.climateScore, 1) <= 1){
        climateColor = lerpColor(theme.palette.error.light, theme.palette.error.main, props.roomSuggestion.climateScore);
    } else {
        climateColor = theme.palette.error.dark;
    }

    if (props.roomSuggestion.climateScore >= 0.5) {
        critical = true;
    } else {
        critical = false;
    }

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
                        {(() => {
                            if (props.roomSuggestion.climateScore <= 0.25) {
                                return <SentimentVerySatisfiedTwoTone sx={iconStyles} />;
                            } else if (props.roomSuggestion.climateScore <= 0.5) {
                                return <SentimentSatisfiedTwoTone sx={iconStyles} />;
                            } else if (props.roomSuggestion.climateScore <= 0.75) {
                                return <SentimentNeutralTwoTone sx={iconStyles} />;
                            } else if (props.roomSuggestion.climateScore <= 1) {
                                return <SentimentDissatisfiedTwoTone sx={iconStyles} />;
                            } else {
                                return <WarningTwoTone sx={iconStyles} />;
                            }
                        })()}
                    </Box>
                </Stack>
            </Card>
        </Grow>
    )
}

export default RoomSuggestionCard;