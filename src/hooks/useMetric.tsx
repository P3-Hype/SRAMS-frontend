import { useEffect, useRef, useState } from "react";
const promAddress = "161.35.193.69:9090"

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
    const [currentEntry, setCurrentEntry] = useState<ValueEntry>()
    const [entries, setEntries] = useState<ValueEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const intervalId = useRef<NodeJS.Timeout>();

    useEffect(() => {
        async function fetchMetric(metricLabel: string) {
            try {
                const url = `http://${promAddress}/api/v1/query?query=${metricLabel}{job="rooms"}${(entries.length <= 1 && span) ? `[${span}m][1m]` : ""}`;
                
                const response = await fetch(url);
                if (!response.ok) throw new Error(`Error, prometheus fetch failed: ${response.statusText}`)
                const jsonData: PromResponse = await response.json();
                
                const responseEntries = jsonData.data.result[0].values;

                setCurrentEntry(responseEntries[1]);
                setEntries(responseEntries);
                setIsLoading(false);
                setError(null);
            } catch (err) {
                setIsLoading(false);
                setError("error");
                console.log(err);

            }
        }

        clearInterval(intervalId.current)
        const id = setInterval(() => {
            fetchMetric(metricLabel);
        }, updateFrequency ?? 5000);
        intervalId.current = id;
    }, [metricLabel, updateFrequency, span]);

    return { 
        currentEntry,
        entries, 
        isLoading, 
        error, 
    };
}

export default useMetric;