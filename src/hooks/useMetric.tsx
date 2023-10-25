import axios from 'axios';
import { useQuery } from 'react-query';

type Metric = {
	__name__: string;
	instance: string;
	job: string;
};

type ValueEntry = [number, string];

type ResultEntry = {
	metric: Metric;
	values: ValueEntry[];
	value: ValueEntry;
};

type Data = {
	resultType: 'matrix' | 'vector' | 'scalar' | 'string';
	result: ResultEntry[];
};

type PromResponse = {
	status: string;
	data: Data;
};

export function useMetric(metricLabel: string, span?: number, updateFrequency?: number) {
	const spanString = span != undefined && span > 0 ? `[${span}m]` : '';
	const { data, isLoading } = useQuery(['metric', metricLabel], {
		queryFn: async () => {
			const { data } = await axios.get(import.meta.env.VITE_PROMETHEUS_API_ADDRESS + 'query', {
				params: {
					query: metricLabel + spanString,
				},
			});
			return data as PromResponse;
		},
		refetchInterval: updateFrequency ?? 5000,
	});

	return { data, isLoading };
}

export default useMetric;
