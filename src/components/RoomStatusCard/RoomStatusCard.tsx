import { Card, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { Co2, Thermostat, WaterDropTwoTone } from "@mui/icons-material";
import { SparkLineChart } from "@mui/x-charts";
import useMetric from "../../hooks/useMetric";


export function RoomStatusCard() {
    const theme = useTheme();
    const co2Data = useMetric("alex_pico_room_co2_level", 5);
    const tempData = useMetric("alex_pico_room_temperature");
    const humidityData = useMetric("alex_pico_room_humidity");

    return (
        <Card sx={{width: "fit-content", padding:0}}>
            {co2Data.isLoading ? <Skeleton animation="wave" variant="rectangular" width={300} height={100}/> : 
            <Stack direction={"column"} overflow={"hidden"}>
                <Typography variant="h6" ml={2} mt={2}>Alex Bedroom</Typography>
                <SparkLineChart 
                    sx={{transform:"scaleX(1.05)"}}
                    colors={[theme.palette.primary.main]}
                    curve="natural"
                    data={co2Data.data?.data.result[0].values.map(v => parseFloat(v[1])) ?? []}
                    width={300}
                    height={100} />
                <Stack alignItems={"center"} direction={"row"} gap={1} ml={2} mb={2}>
                    <Co2 fontSize="large" />
                    <Typography mr={2} justifyItems={"center"} variant="body2">
                        {Math.round(parseFloat(co2Data.data?.data.result[0].values[0][1] ?? ""))}
                    </Typography>
                    <Thermostat />
                    <Typography mr={2} justifyItems={"center"} variant="body2">
                        {Math.round(parseFloat(tempData.data?.data.result[0].values[1] ?? ""))}º</Typography>
                    <WaterDropTwoTone />
                    <Typography justifyItems={"center"} variant="body2">
                        {Math.round(parseFloat(humidityData.data?.data.result[0].values[1] ?? ""))}%</Typography>
                </Stack>
            </Stack>}
        </Card>
    )
}

export default RoomStatusCard