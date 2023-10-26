import {
	Alert,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Container,
	Divider,
	Snackbar,
	Typography,
} from '@mui/material';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useAlert from '../../hooks/useAlert';

interface MyFallbackComponentProps {
	error: Error;
	resetErrorBoundary: () => void;
}

function MyFallbackComponent({ error, resetErrorBoundary }: MyFallbackComponentProps) {
	return (
		<Container>
			<Card
				sx={{
					width: '100%',
					marginTop: 4,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<CardHeader title={'Ooops, something went wrong! 🦧'}></CardHeader>
				<CardContent>
					<Divider />
					<Typography mt={2} variant='body1' color={'error'}>
						{error.message}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button variant='outlined' color='error' onClick={resetErrorBoundary}>
						Try again
					</Button>
				</CardActions>
			</Card>
		</Container>
	);
}

interface BasePageProps {
	readonly alert: ReturnType<typeof useAlert>;
	readonly children: ReactNode;
}

export function BasePage(props: BasePageProps) {
	const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		props.alert.setIsOpen(false);
	};

	return (
		<>
			<ErrorBoundary
				FallbackComponent={MyFallbackComponent}
				onReset={() => {
					console.log('reset');
				}}
				onError={(error, info) => {
					console.log('Caught an error:', error, info);
					props.alert.setMessage(error.message);
					props.alert.setSeverity('error');
					props.alert.setIsOpen(true);
				}}
			>
				<Box flex={'row'} marginTop={2}>
					{props.children}
				</Box>
			</ErrorBoundary>
			<Snackbar
				open={props.alert.isOpen}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				autoHideDuration={10000}
				onClose={handleClose}
			>
				<Alert variant='outlined' severity={props.alert.severity} onClose={handleClose}>
					{props.alert.message || 'snackbar'}
				</Alert>
			</Snackbar>
		</>
	);
}

export default BasePage;
