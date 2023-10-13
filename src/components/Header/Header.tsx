import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
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
                    <IconButton>
                        <HelpOutlineIcon />
                    </IconButton>
                </Stack>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;
