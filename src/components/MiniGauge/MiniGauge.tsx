import { useTheme } from '@mui/material';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import { useEffect, useRef } from 'react';

interface MiniGaugeProps {
	color: string;
	value: number;
}

const gaugeOption: EChartsOption = {
	series: [
		{
			type: 'gauge',
			min: 0,
			max: 1,
			progress: {
				show: true,
				width: 8,
			},
			axisLine: {
				lineStyle: {
					width: 8,
				},
			},
			axisTick: {
				show: false,
			},
			splitLine: {
				show: false,
			},
			axisLabel: {
				show: false,
			},
			pointer: {
				show: false,
			},
			anchor: {
				show: false,
			},
			title: {
				show: false,
			},
			emphasis: {
				disabled: true,
			},
			detail: {
				valueAnimation: true,
				fontSize: 14,
				fontFamily: 'Geist-Bold',
				color: 'inherit',
				offsetCenter: [0, '10%'],
				formatter: '{value}',
			},
			radius: '100%',
			data: [
				{
					value: 0.5,
				},
			],
		},
	],
};

function MiniGauge(props: MiniGaugeProps) {
	const ref = useRef<ReactECharts>(null);
	const theme = useTheme();

	useEffect(() => {
		if (ref.current !== null) {
			ref.current.getEchartsInstance().setOption({
				...gaugeOption,
				series: [
					{
						axisLine: {
							lineStyle: {
								width: 8,
								color: [[1, theme.palette.background.default]],
							},
						},
						detail: {
							color: theme.palette.primary.main,
						},
					},
				],
			});
		}
	}, [ref, theme.palette.primary.main]);

	useEffect(() => {
		if (ref.current !== null) {
			ref.current.getEchartsInstance().setOption({
				...gaugeOption,
				series: [
					{
						data: [
							{
								value: props.value > 0 ? props.value.toFixed(2) : 1,
							},
						],
						itemStyle: {
							color: props.color,
						},
					},
				],
			});
		}
	}, [ref, props.value, props.color]);

	return <ReactECharts ref={ref} style={{ height: '4rem', width: '4rem' }} option={gaugeOption} />;
}

export default MiniGauge;
