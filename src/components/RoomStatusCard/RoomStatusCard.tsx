import { Card, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Co2, Thermostat, WaterDropTwoTone } from "@mui/icons-material";
import { SparkLineChart } from "@mui/x-charts";
import useMetric from "../../hooks/useMetric";


export function RoomStatusCard() {
    const theme = useTheme();
    const co2Data = useMetric("alex_pico_room_co2_level", 5);
    const tempData = useMetric("alex_pico_room_temperature", 1);
    const humidityData = useMetric("alex_pico_room_humidity", 1);

    return (
        <Card sx={{width: "fit-content", padding:0}}>
            {co2Data.isLoading ? <Skeleton animation="wave" variant="rectangular" width={300} height={100}/> : 
            <Stack direction={"column"} overflow={"hidden"}>
                <Typography variant="h6" ml={2} mt={2}>Alex Bedroom</Typography>
                <SparkLineChart 
                    sx={{transform:"scaleX(1.05)"}}
                    colors={[theme.palette.primary.main]}
                    curve="natural"
                    data={co2Data.entries ?? []}
                    width={300}
                    height={100} />
                <Stack alignItems={"center"} direction={"row"} gap={1} ml={2} mb={2}>
                    <Co2 fontSize="large" />
                    <Typography mr={2} justifyItems={"center"} variant="body2">{Math.round(co2Data.currentEntry)}
                    </Typography>
                    <Thermostat />
                    <Typography mr={2} justifyItems={"center"} variant="body2">{Math.round(tempData.currentEntry)}º</Typography>
                    <WaterDropTwoTone />
                    <Typography justifyItems={"center"} variant="body2">{Math.round(humidityData.currentEntry)}%</Typography>
                </Stack>
            </Stack>}
        </Card>
    )
}

export default RoomStatusCard