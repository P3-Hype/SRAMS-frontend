import { Co2, DirectionsWalk, Thermostat, WaterDropTwoTone } from '@mui/icons-material';
import { MetricType } from '../../metricLink';
import { SxProps, Theme, Tooltip } from '@mui/material';

interface MetricAutoIconProps {
	readonly metric: MetricType;
	readonly tooltip?: boolean;
	readonly color?: string;
}

const formatMetricType = (metric: MetricType) => {
	return metric.toString().toLowerCase().split('_').join(' ');
};

function MetricAutoIcon(props: MetricAutoIconProps) {
	const metric = props.metric;
	const sxProps:SxProps<Theme> = props.color ? {color: props.color} : {};

	if (props.tooltip) {
		return (
			<>
				{metric == MetricType.CO2_LEVEL && <Co2 sx={sxProps}/>}
				{metric == MetricType.TEMPERATURE && <Thermostat  sx={sxProps}/>}
				{metric == MetricType.HUMIDITY && <WaterDropTwoTone  sx={sxProps}/>}
				{metric == MetricType.PASSIVE_INFRARED && <DirectionsWalk  sx={sxProps}/>}
			</>
		);
	}

	return (
		<Tooltip title={formatMetricType(metric)}>
			<>
				{metric == MetricType.CO2_LEVEL && <Co2 sx={sxProps}/>}
				{metric == MetricType.TEMPERATURE && <Thermostat sx={sxProps}/>}
				{metric == MetricType.HUMIDITY && <WaterDropTwoTone sx={sxProps}/>}
				{metric == MetricType.PASSIVE_INFRARED && <DirectionsWalk sx={sxProps}/>}
			</>
		</Tooltip>
	);
}

export default MetricAutoIcon;
