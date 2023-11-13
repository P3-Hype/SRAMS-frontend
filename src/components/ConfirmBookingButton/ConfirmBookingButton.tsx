import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

function ConfirmBookingButton (){

    const theme = useTheme();

    const buttonStyle = {
		variant: 'contained',
		backgroundColor: theme.palette.primary.main,
		color: 'white',
	};

	return (
            <Button sx={buttonStyle}>Confirm booking</Button>
	);

}

export default ConfirmBookingButton;