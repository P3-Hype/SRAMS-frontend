import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const Clock = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return <Typography>{time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>;
};

export const ClockLater = () => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			const currentTime = new Date();
			currentTime.setHours(currentTime.getHours() + 4); // Add four hours
			setTime(currentTime);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return <Typography>{time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>;
};
