import { Slider, useTheme } from '@mui/material';
import { MetricLink, MetricType } from '../../metricLink';
import { Stack } from '@mui/material';
import MetricAutoIcon from '../MetricAutoIcon/MetricAutoIcon';

interface MetricSliderProps {
	readonly type: MetricType;
	readonly metricLink?: MetricLink;
}

const co2Props = { min: 0, max: 5000, step: 100 };
const humidityProps = { min: 0, max: 100, step: 1 };
const temperatureProps = { min: 15, max: 30, step: 1 };

const co2Format = (value: number) => value + ' PPM';
const temperatureFormat = (value: number) => value + ' °C';
const humidityFormat = (value: number) => value + '%';

const co2Default = 800;
const temperatureDefault = [19, 24];
const humidityDefault = [40, 70];

function getDefaultValue(metricLink: MetricLink):number | number[] {
    if (metricLink.type == MetricType.CO2_LEVEL) {
        return metricLink.highLimit;
    } else {
        return [metricLink.lowLimit, metricLink.highLimit];
    }
}

function MetricSlider(props: MetricSliderProps) {
    const theme = useTheme();
	const disabled = props.metricLink == null || props.metricLink == undefined;
	const type = props.type;
	const extraProps =
		type === MetricType.CO2_LEVEL ? co2Props : type === MetricType.HUMIDITY ? humidityProps : temperatureProps;
    const format = type === MetricType.CO2_LEVEL ? co2Format : type === MetricType.HUMIDITY ? humidityFormat : temperatureFormat;

	return (
		<Stack alignItems={'center'} gap={2}>
			<Slider
				sx={{ minHeight: '12rem' }}
				disabled={disabled}
                color='primary'
				orientation='vertical'
				defaultValue={
                    !disabled 
                    ? getDefaultValue(props.metricLink) 
                    : type == MetricType.CO2_LEVEL 
                    ? co2Default
                    : type == MetricType.TEMPERATURE 
                    ? temperatureDefault
                    : humidityDefault
                }
				valueLabelDisplay='auto'
				valueLabelFormat={format}
				{...extraProps}
			/>
            {disabled
                ? <MetricAutoIcon metric={type} color={theme.palette.primary.light} /> 
                : <MetricAutoIcon metric={type} color={theme.palette.primary.main}/>
            }
		</Stack>
	);
}

export default MetricSlider;
