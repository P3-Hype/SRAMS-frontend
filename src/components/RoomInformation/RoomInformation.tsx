import useMetric from '../../hooks/useMetric';
import { useTheme } from '@mui/material';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';

const formatUnix = (unix: number) => {
	const date = new Date(unix * 1000);
	const h = date.getHours().toString().padStart(2, '0');
	const m = date.getMinutes().toString().padStart(2, '0');
	const s = date.getSeconds().toString().padStart(2, '0');
	return `${h}:${m}:${s}`;
};

interface DataItem {
	name: string;
	value: [number, number];
}

export function RoomInformation() {
	const theme = useTheme();
	const { data, isLoading } = useMetric('alex_pico_room_co2_level', 120, 5, 5);
	const [chartData, setChartData] = useState<DataItem[]>([]);
	const metricChartOptions:EChartsOption = {
		title: {
			textStyle: {
				color: theme.palette.primary.main,
			},
			text: 'CO2',
		},
		tooltip: {
			shadowColor: theme.palette.background.default,
			trigger: 'axis',
			axisPointer: {
				animation: false,
				lineStyle: {
					color: theme.palette.primary.light,
				}
			},
		},
		xAxis: {
			type: 'time',
			splitLine: {
				show: false,
			},
		},
		yAxis: {
			type: 'value',
			splitLine: {
				show: false,
			},
			min: 'dataMin',
		},
	};
	useEffect(() => {
		const x =
			data?.data.result[0].values.map((value) => {
				const d = new Date(value[0]);
				return {
					name: formatUnix(value[0]),
					value: [value[0]*1000, parseFloat(value[1])],
				} as DataItem;
			}) ?? [];
		setChartData(x);
		console.log(chartData);
		
	}, [data]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<ReactECharts
			option={
				{
					...metricChartOptions,
					series: [
						{
							data: chartData,
							showSymbol: false,
							type: 'line',
							color: theme.palette.secondary.main,
							areaStyle: {
								color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
								  {
									offset: 0,
									color: theme.palette.secondary.main
								  },
								  {
									offset: 1,
									color: "#ffffff00"
								  }
								])
							  },
						}
					]
				} as echarts.EChartsOption
			}
		/>
	);
}

export default RoomInformation;
