import { Stack, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { useEffect } from "react";
import {useTheme} from "@mui/material";
import { Co2, Thermostat, WaterDropTwoTone } from "@mui/icons-material";

interface SimpleChartProps {
    readonly title: string
    readonly yData: number[]
}

export function SimpleChart(props: SimpleChartProps) {
    const theme = useTheme();
    
    useEffect(() => {
        console.log(props.yData);
    }, [props.yData])

    return (
        <Stack direction={"column"} overflow={"hidden"}>
            <Typography variant="h4" ml={2} mt={2}>Alex Bedroom</Typography>
            <SparkLineChart sx={{transform:"scaleX(1.1)"}} colors={[theme.palette.primary.main]}  curve="natural" data={props.yData} width={300} height={100} />
            <Stack alignItems={"center"} direction={"row"} gap={1} ml={2} mb={2}>
                <Co2 fontSize="large"/>
                <Typography justifyItems={"center"} variant="body1">{props.yData[props.yData.length-1]}</Typography>
                <Thermostat />
                <WaterDropTwoTone />
            </Stack>
        </Stack>
    );
}

export default SimpleChart;