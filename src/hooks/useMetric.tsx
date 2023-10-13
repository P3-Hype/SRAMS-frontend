import { useEffect, useState } from "react";
const promUrl = "http://161.35.193.69:9090/api/v1/query?query="

export function useMetric(metricLabel:string) {
    const [metric, setMetric] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchMetric(metricLabel:string) {
        try {
            const response = await fetch(promUrl + metricLabel);
            if (!response.ok) {
                throw new Error(`Error, prometheus fetch failed: ${response.statusText}`)
            }
            const jsonData = await response.json();
            setMetric(jsonData.data);
            setIsLoading(false);
            setError(null);
        
        } catch(err) {
            setIsLoading(false);
            setError(null);
        }
    }

    useEffect(() => {
        setInterval(() => {
            fetchMetric(metricLabel);
        },5000)
    }, [metricLabel])

    return {metric, isLoading, error};
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