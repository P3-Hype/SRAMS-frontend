import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DeleteForeverRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

export default function FormDialog(props: { readonly handleDelete: () => void }) {
	const [open, setOpen] = useState(false);
	const [confirmText, setConfirmText] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirme = () => {
		if (confirmText.toLowerCase() == 'delete') {
			props.handleDelete();
		}
	};

	return (
		<>
			<IconButton onClick={handleClickOpen}>
				<DeleteForeverRounded color='error' />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>Deleting this room is permenent, and can not be recovered.</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Write Delete to confirme'
						fullWidth
						variant='standard'
						onChange={(event) => setConfirmText(event.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleConfirme}>Delete</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
