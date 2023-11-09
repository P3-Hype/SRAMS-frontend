import { AppBar, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Logo from '../Logo/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ToggleView from '../ToggleView/ToggleView';
import BookButton from '../BookButton/BookButton';

function Header() {
	return (
		<AppBar position='relative' sx={{ bgcolor: 'primary.main' }}>
			<Toolbar>
				<Container>
					<Stack direction={'row'} alignItems={'center'}>
						<Box
							sx={{
								flexGrow: '1',
							}}
						>
							<Link
								component={RouterLink}
								to='/'
								style={{
									display: 'inline-block',
								}}
							>
								<Logo expandOnHover />
							</Link>
						</Box>
						<Stack direction={'row'} alignItems={'center'} spacing={3}>
							<ToggleView></ToggleView>
							<BookButton></BookButton>
							<IconButton>
								<HelpOutlineOutlinedIcon
									sx={{
										color: 'primary.contrastText',
									}}
								/>
							</IconButton>
						</Stack>
					</Stack>
				</Container>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
