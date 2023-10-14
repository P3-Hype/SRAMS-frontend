import { useEffect, useState } from "react";
const promAddress = "161.35.193.69:9090"

export function useMetric(metricLabel:string, span:number) {
    const [metric, setMetric] = useState(null);
    const [current, setCurrent] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>();

    async function fetchMetric(metricLabel:string) {
        try {
            const url = `http://${promAddress}/api/v1/query?query=${metricLabel}{job="rooms"}[${span}m]`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error, prometheus fetch failed: ${response.statusText}`)
            }
            const jsonData = await response.json();
            setMetric(jsonData.data);
            setCurrent(jsonData.data.result[0].values.pop()[1]);
            setIsLoading(false);
            setError(null);

        } catch(err) {
            setIsLoading(false);
            setError("error");
            console.log(err);
            
        }
    }

    useEffect(() => {
        clearInterval(intervalId)
        const id = setInterval(() => {
            fetchMetric(metricLabel);
        }, 5000);
        setIntervalId(id)
    }, [metricLabel]);

    return {metric, isLoading, error, current};
}

export default useMetric;


/*
function usePrometheusMetrics(query) {
const [metrics, setMetrics] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
async function fetchMetrics() {
try {
// Replace 'prometheus-url' with the actual URL of your Prometheus server and 'query' with your Prometheus query.
const response = await fetch(http://prometheus-url/api/v1/query?query=${query});
if (!response.ok) {
throw new Error(Failed to fetch metrics: ${response.statusText});
}
const data = await response.json();
setMetrics(data.data.result);
setLoading(false);
setError(null);
} catch (err) {
setError(err);
setLoading(false);
}
}
*/