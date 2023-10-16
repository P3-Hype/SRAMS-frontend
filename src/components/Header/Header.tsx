import { AppBar, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import Logo from '../Logo/Logo';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ToggleView from '../ToggleView/ToggleView';

function Header() {
    return (
        <AppBar position="relative" sx={{ bgcolor: "primary.main" }}>
            <Toolbar>
                <Container>
                    <Stack direction={"row"} alignItems={'center'}>
                        <Box sx={{
                            flexGrow: "1"
                        }}>
                            <Link component={RouterLink} to="/" style={{ display: 'inline-block' }}>
                                <Logo expandOnHover />
                            </Link>
                        </Box>
                        <Stack direction={'row'} alignItems={'center'} spacing={2}>
                            <ToggleView></ToggleView>
                            <IconButton>
                                <HelpOutlinedIcon sx={{color: "primary.contrastText"}}/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>

        </AppBar>
    )
}

export default Header;
