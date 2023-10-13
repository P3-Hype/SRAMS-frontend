import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import ToggleView from '../ToggleView/ToggleView';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function Header(){
    return(
        <AppBar position="relative" sx={{
            color: "primary"
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    ml: 2
                }}>
                    <Link component={RouterLink} to="/">
                        <Logo expandOnHover />
                    </Link>
                </Box>
                <Stack direction={'row'} spacing={2}>
                    <ToggleView></ToggleView>
                    <IconButton>
                        <HelpOutlineIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;
