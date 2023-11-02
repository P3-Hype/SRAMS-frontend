import { SaveOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';

interface SaveButtonProps {
	readonly isLoading: boolean;
	readonly saveHandler: () => void;
}

function SaveButton(props: SaveButtonProps) {
	return (
		<Button
			variant='outlined'
			color={'success'}
			sx={{
				width: 'fit-content',
				minWidth: '8rem',
				justifyContent: 'flex-start',
			}}
			onClick={() => {
				props.saveHandler();
			}}
		>
			{props.isLoading ? <CircularProgress color='success' size={'1.5rem'} /> : <SaveOutlined />}
			<Typography ml={1} textTransform={'none'}>
				{props.isLoading ? 'Saving' : 'Save'}
			</Typography>
		</Button>
	);
}

export default SaveButton;
