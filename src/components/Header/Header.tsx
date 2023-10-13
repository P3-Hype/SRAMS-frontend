import { AppBar, Box, Container, IconButton, Stack, Toolbar } from '@mui/material';
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
                            flexGrow: "1",
                            ml: 2
                        }}>
                            <Link component={RouterLink} to="/" style={{ display: 'inline-block' }}>
                                <Logo expandOnHover />
                            </Link>
                        </Box>
                        <Stack direction={'row'} spacing={2}>
                            <ToggleView></ToggleView>
                            <IconButton>
                                <HelpOutlineIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                </Container>
            </Toolbar>

        </AppBar>
    )
}

export default Header;
