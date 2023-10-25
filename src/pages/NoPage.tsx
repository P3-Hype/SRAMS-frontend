import BasePage from '../components/BasePage/BasePage';
import useAlert from '../hooks/useAlert';

function NoPage() {
	const alert = useAlert();

	return (
		<BasePage alert={alert}>
			<div>
				<h1>Error 404: Time for a break</h1>
				<img
					src='https://miro.medium.com/v2/resize:fit:1400/1*HVw8w6EZByyTIWHkJx6Odw.jpeg'
					alt='gummiand debugger'
					width='600'
					height='400'
				/>
				<img
					src='https://www.courant.com/wp-content/uploads/migration/2015/10/19/ALQXWRZJJJA7JFOC3VY6PIGT2A.jpg?'
					alt='VacationDuck'
					width='600'
					height='400'
				></img>
			</div>
		</BasePage>
	);
}

export default NoPage;
