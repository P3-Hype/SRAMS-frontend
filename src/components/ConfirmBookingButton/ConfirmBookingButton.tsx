import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';

function ConfirmBookingButton (){

    const theme = useTheme();

	return (
            <Button sx={{
				variant: 'contained',
				backgroundColor: theme.palette.primary.main,
				color: 'white',
			}}>Confirm booking</Button>
	);

}

export default ConfirmBookingButton;