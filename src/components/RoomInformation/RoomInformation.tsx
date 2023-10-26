import { LineChart } from '@mui/x-charts';
import useMetric from '../../hooks/useMetric';

export function RoomInformation() {
	const { data, isLoading } = useMetric('alex_pico_room_co2_level');

	if (isLoading) return <div>Loading...</div>;
	console.log(data?.data.result[0]);

	return <LineChart xAxis={[{ data: [data?.data.result[0].values[0][0]] }]} series={[{ data: [1] }]} height={400} />;
}

export default RoomInformation;
