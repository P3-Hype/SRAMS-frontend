import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';


function BookButton() {
	const theme = useTheme();


	const buttonStyle = {
		fontSize: '1.5rem',
		padding: '15px 30px',
		width: '200px',
		height: '125px',
		variant: 'contained',
		backgroundColor: theme.palette.primary.main, // Use primary theme color
		color: 'white', // Set text color
	};

	return (
			<Link component={RouterLink} to='/Booking'>
				<Button sx={buttonStyle}>Book Room</Button>
			</Link>
	);
}

export default BookButton;
