import { Co2, DirectionsWalk, Thermostat, WaterDropTwoTone } from '@mui/icons-material';
import { MetricType } from '../../metricLink';
import { Tooltip } from '@mui/material';

interface MetricAutoIconProps {
	readonly metric: MetricType;
	readonly tooltip?: boolean;
}

const formatMetricType = (metric: MetricType) => {
	return metric.toString().toLowerCase().split('_').join(' ');
};

function MetricAutoIcon(props: MetricAutoIconProps) {
	const metric = props.metric;

	if (props.tooltip) {
		return (
			<>
				{metric == MetricType.CO2_LEVEL && <Co2 />}
				{metric == MetricType.TEMPERATURE && <Thermostat />}
				{metric == MetricType.HUMIDITY && <WaterDropTwoTone />}
				{metric == MetricType.PASSIVE_INFRARED && <DirectionsWalk />}
			</>
		);
	}

	return (
		<Tooltip title={formatMetricType(metric)}>
			<>
				{metric == MetricType.CO2_LEVEL && <Co2 />}
				{metric == MetricType.TEMPERATURE && <Thermostat />}
				{metric == MetricType.HUMIDITY && <WaterDropTwoTone />}
				{metric == MetricType.PASSIVE_INFRARED && <DirectionsWalk />}
			</>
		</Tooltip>
	);
}

export default MetricAutoIcon;
