export enum MetricType {
	CO2_LEVEL = 'CO2_LEVEL',
	TEMPERATURE = 'TEMPERATURE',
	HUMIDITY = 'HUMIDITY',
	PASSIVE_INFRARED = 'PASSIVE_INFRARED',
}

export interface MetricLink {
	id: string;
	roomId: string;
	metricId: string;
	type: MetricType;
	lowLimit: number;
	highLimit: number;
}
