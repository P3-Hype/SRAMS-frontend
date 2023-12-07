import { AppBar, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Logo from '../Logo/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import ToggleView from '../ToggleView/ToggleView';
import BookButton from '../BookButton/BookButton';
import { useEffect, useState } from 'react';

function BarContent() {
	return (
		<Stack direction={'row'} alignItems={'center'} width={"100%"}>
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
							{location.pathname === '/dashboard' && <ToggleView />}
							{location.pathname != '/dashboard' && <BookButton />}
							<IconButton>
								<HelpOutlineOutlinedIcon
									sx={{
										color: 'primary.contrastText',
									}}
								/>
							</IconButton>
						</Stack>
					</Stack>
	)
}

function Header() {
	const location = useLocation();
	const [fullWidth, setFullWidth] = useState(false);

	useEffect(() => {
		setFullWidth(location.pathname === '/dashboard')
	}, [location]);

	return (
		<AppBar position='relative' sx={{ bgcolor: 'primary.main' }}>
			<Toolbar>
				{fullWidth 
				? <BarContent />
				: <Container><BarContent /></Container>
				}
			</Toolbar>
		</AppBar>
	);
}

export default Header;
