import useMetric from '../../hooks/useMetric';
import { Box, Fade, LinearProgress, Stack, ToggleButton, ToggleButtonGroup, Typography, useTheme } from '@mui/material';
import { EChartsOption } from 'echarts';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { useEffect, useState } from 'react';
import Room from '../../room';
import { MetricLink } from '../../metricLink';
import { useQuery } from 'react-query';
import axios from 'axios';
import MetricAutoIcon from '../MetricAutoIcon/MetricAutoIcon';

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

interface RoomInformationProps {
	readonly room: Room;
}

export function RoomInformation(props: RoomInformationProps) {
	const theme = useTheme();
	const [selectedMetricLink, setSelectedMetricLink] = useState<MetricLink>();
	const [metricQuery, setMetricQuery] = useState<string | null>(null);
	const [chartData, setChartData] = useState<DataItem[]>([]);

	const metricLinks = useQuery(['roomMetricLinks', props.room.id], {
		queryFn: async () => {
			const { data } = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}metricLink/getAllByRoomId`, {
				params: {
					roomId: props.room.id,
				},
			});
			return data as MetricLink[];
		},
	});
	const { data, isLoading } = useMetric(metricQuery, 120, 5, 5000);

	const metricChartOptions: EChartsOption = {
		grid: {
			left: 100,
			right: 20,
			top: 20,
			bottom: 20,
		},
		tooltip: {
			shadowColor: theme.palette.background.default,
			trigger: 'axis',
			axisPointer: {
				animation: false,
				lineStyle: {
					color: theme.palette.primary.light,
				},
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
				return {
					name: formatUnix(value[0]),
					value: [value[0] * 1000, parseFloat(value[1])],
				} as DataItem;
			}) ?? [];
		setChartData(x);
	}, [data]);

	const handleSelectMetricLink = (_: React.MouseEvent<HTMLElement>, ml: MetricLink) => {
		if (ml === undefined) return;
		const query = `${ml.metricId}_${ml.type.toLocaleLowerCase()}`;

		setSelectedMetricLink(ml);
		setMetricQuery(query);
	};

	if (metricLinks.isLoading) return <LinearProgress />;
	return (
		<Stack direction={'row'} display={'flex'}>
			<ToggleButtonGroup
				orientation='vertical'
				value={selectedMetricLink}
				exclusive
				onChange={handleSelectMetricLink}
			>
				{metricLinks.data?.map((ml) => {
					return (
						<ToggleButton key={ml.id} value={ml}>
							<MetricAutoIcon tooltip metric={ml.type} />
						</ToggleButton>
					);
				})}
			</ToggleButtonGroup>
			{!isLoading && !!metricQuery ? (
				<Fade in>
					<Box width={1}>
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
												opacity: 0.8,
												color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
													{
														offset: 0,
														color: theme.palette.secondary.main,
													},
													{
														offset: 1,
														color: '#ffffff00',
													},
												]),
											},
										},
									],
								} as echarts.EChartsOption
							}
						/>
					</Box>
				</Fade>
			) : (
				<Typography variant='subtitle2' color={theme.palette.warning.light}>
					No metric selected
				</Typography>
			)}
		</Stack>
	);
}

export default RoomInformation;
