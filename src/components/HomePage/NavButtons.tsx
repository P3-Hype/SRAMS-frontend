import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

/**
 * NavButtons is a component function that returns 2 styled navigation buttons,
 * which takes the client to the admin or overview page.
 *
 * @returns 2 nice buttons
 */

export default function NavButtons() {
	const theme = useTheme();

	/**
	 * BytStyle is used to style the buttons
	 */
	const buttonStyle = {
		fontSize: '1.5rem',
		padding: '15px 30px',
		width: '200px',
		height: '125px',
		variant: 'contained',
		backgroundColor: theme.palette.primary.main, // Use primary theme color
		color: 'white', // Set text color
	};

	/**
	 * GridStyle is used to center align the 2 buttons
	 */
	const GridStyle = {
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
	};

	const [isLoading, setIsLoading] = useState(false);

	function refreshPage() {
		setIsLoading(true);
		setTimeout(()=>{
			window.location.reload();
		}, 1);
		console.log('page to reload')
	}

	return (
		<>
			{isLoading && (
				<div
				style={{
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					background: 'rgba(0, 0, 0, 0.5)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 9999,
				}}
				>
				<CircularProgress color="inherit" />
				</div>
			)}
			<Grid container spacing={20} style={GridStyle}>
				<Grid item>
					<Link component={RouterLink} to='/admin' onClick={refreshPage}>
						<Button sx={buttonStyle}>Admin</Button>
					</Link>
				</Grid>
				<Grid item>
					<Link component={RouterLink} to='/overview'>
						<Button sx={buttonStyle}>Manage Bookings</Button>
					</Link>
				</Grid>
				<Grid item>
					<Link component={RouterLink} to='/dashboard'>
						<Button sx={buttonStyle}>Dashboard</Button>
					</Link>
				</Grid>
			</Grid>
		</>
	);
}
//function useState(arg0: boolean): [any, any] {
//	throw new Error('Function not implemented.');
//}

