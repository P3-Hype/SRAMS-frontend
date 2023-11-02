import { Stack, Slider, useTheme } from '@mui/material';
import { MetricLink, MetricType } from '../../metricLink';
import MetricAutoIcon from '../MetricAutoIcon/MetricAutoIcon';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';

type LimitRange = number | number[];

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

function getDefaultValue(metricLink?: MetricLink): LimitRange {
    if (metricLink == null || metricLink == undefined) return co2Default;
    if (metricLink.type == MetricType.CO2_LEVEL) {
        return metricLink.highLimit;
    } else {
        return [metricLink.lowLimit, metricLink.highLimit];
    }
}

function setMetricLinkLimits(metricLink: MetricLink, limitRange: LimitRange) {
    if (limitRange instanceof Array) {
        metricLink.lowLimit = limitRange[0];
        metricLink.highLimit = limitRange[1];
    } else {
        metricLink.highLimit = limitRange;
    }
}

function MetricSlider(props: MetricSliderProps) {
    const theme = useTheme();
    const queryClient = useQueryClient();
    const [limits, setLimits] = useState<LimitRange>(getDefaultValue(props.metricLink));
    const debouncedLimits = useDebounce<LimitRange>(limits, 500);
    const updateMetricLinkMutation = useMutation({
        mutationFn: (metricLink: MetricLink) => {
            return axios.put(import.meta.env.VITE_SRAMS_API_ADDRESS + 'metricLink/updateMetricLinkLimits', {
                metricLinkId: metricLink.id, 
                lowLimit: metricLink.lowLimit, 
                highLimit: metricLink.highLimit
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['roomMetricLinks', props.metricLink?.roomId])
        }
    });
    useEffect(() => {
        if (props.metricLink == null || props.metricLink == undefined) return;
        setMetricLinkLimits(props.metricLink, debouncedLimits);
        updateMetricLinkMutation.mutate(props.metricLink);
    },[debouncedLimits]);
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
                onChange={(_, v: LimitRange) => setLimits(v)}
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
