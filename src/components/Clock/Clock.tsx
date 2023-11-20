import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const Clock = (props: {offsetHours?: number}) => {
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			const currentTime = new Date();
			const offset = props.offsetHours ?? 0;
			currentTime.setHours(currentTime.getHours() + offset);
			setTime(currentTime);
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	return <Typography>{time.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</Typography>;
};