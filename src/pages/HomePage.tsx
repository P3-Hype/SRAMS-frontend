import { Container } from '@mui/material';
import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';
import NavButtons from '../components/HomePage/NavButtons';
import { useEffect } from 'react';

function HomePage() {
	const alert = useAlert();

	useEffect(() => {
		alert.setIsOpen(true);
		alert.setMessage('Welcome to the home page!');
		alert.setSeverity('info');
	}, [])

	return (
		<BasePage alert={alert}>
			<Container>
				<NavButtons />
			</Container>
		</BasePage>
	);
}

export default HomePage;
