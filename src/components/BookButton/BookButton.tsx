import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';


function BookButton() {
	const theme = useTheme();


	const buttonStyle = {
		variant: 'contained',
		backgroundColor: theme.palette.secondary.main,
		color: 'white', // Set text color
	};

	return (
			<Link component={RouterLink} to='/booking'>
				<Button sx={buttonStyle}>Book Room</Button>
			</Link>
	);
}

export default BookButton;
