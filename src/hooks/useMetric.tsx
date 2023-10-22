import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

type Metric = {
    __name__: string;
    instance: string;
    job: string;
};

type ValueEntry = [number, string];

type ResultEntry = {
    metric: Metric;
    values: ValueEntry[];
};

type Data = {
    resultType: "matrix" | "vector" | "scalar" | "string";
    result: ResultEntry[];
};

type PromResponse = {
    status: string;
    data: Data;
};

export function useMetric(metricLabel: string, span?: number, updateFrequency?:number) {
    const [currentEntry, setCurrentEntry] = useState<number>(0);
    const [entries, setEntries] = useState<number[]>([]);

    const {isLoading} = useQuery(['metric', metricLabel], {
        queryFn: async () => {
            const {data} = await axios.get(import.meta.env.VITE_PROMETHEUS_API_ADDRESS + 'query', {
                params: {
                    query: metricLabel + `[${span}m]`
                }
            });
            return data as PromResponse;
        },
        onSuccess: (response) => {
            setCurrentEntry(parseFloat(response.data.result[0].values[0][1]));
            if (response.data.resultType != "matrix") return;
            setEntries(response.data.result[0].values.map(v => parseFloat(v[1]) ?? 0));
        },
        refetchInterval: updateFrequency ?? 5000
    })

    return {currentEntry, entries, isLoading}
}

export default useMetric;