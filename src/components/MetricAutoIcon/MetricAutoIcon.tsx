import { Co2, DirectionsWalk, Thermostat, WaterDropTwoTone } from "@mui/icons-material";
import { MetricType } from "../../metricLink";
import { Tooltip } from "@mui/material";

interface MetricAutoIconProps {
    metric: MetricType;
}

const formatMetricType = (metric: MetricType) => {
    return metric.toString().toLowerCase().split('_').join(' ');
}

function MetricAutoIcon(props: MetricAutoIconProps) {
    const metric = props.metric;
    const Icon = () => {
        if (metric == MetricType.CO2_LEVEL) return <Co2 />
        if (metric == MetricType.TEMPERATURE) return <Thermostat />
        if (metric == MetricType.HUMIDITY) return <WaterDropTwoTone />
        if (metric == MetricType.PASSIVE_INFRARED) return <DirectionsWalk />
    }

    console.log(formatMetricType(metric));

    return (
        <Tooltip placement="right" arrow title={formatMetricType(metric)}>
            <Icon />
        </Tooltip>
    )
}

export default MetricAutoIcon;