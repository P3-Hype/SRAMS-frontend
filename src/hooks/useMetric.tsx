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

export function useMetric(metricQuery: string | null, span?: number, spanInterval?: number, updateFrequency?: number) {
	const spanIntervalString = spanInterval != undefined && spanInterval > 0 ? `:${spanInterval}s` : '';
	const spanString = span != undefined && span > 0 ? `[${span}m${spanIntervalString}]` : '';
	const { data, isLoading } = useQuery(['metric', metricQuery], {
		queryFn: async () => {			
			const { data } = await axios.get(import.meta.env.VITE_PROMETHEUS_API_ADDRESS + 'query', {
				params: {
					query: metricQuery + spanString,
				},
			});
			return data as PromResponse;
		},
		refetchInterval: updateFrequency ?? 5000,
		enabled: !!metricQuery,
	});

	return { data, isLoading };
}

export default useMetric;
