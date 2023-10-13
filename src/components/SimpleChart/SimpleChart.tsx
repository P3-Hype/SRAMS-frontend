import { Stack, Typography } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import { useEffect } from "react";
import {useTheme} from "@mui/material";

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
            <SparkLineChart sx={{transform:"scaleX(1.1)"}} colors={[theme.palette.secondary.main]}  curve="natural" data={props.yData} width={300} height={100} />
            <Typography variant="body1" ml={2} mb={2}>
                CO2: {props.yData[props.yData.length-1]}
            </Typography>
        </Stack>
    );
}

export default SimpleChart;