import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';

import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import ToggleView from '../ToggleView/ToggleView';

function Header(){
    return(
        <AppBar position="relative" sx={{bgcolor:"primary.main"}}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    ml: 2
                }}>
                    <Link component={RouterLink} to="/" style={{display: 'inline-block'}}>
                        <Logo expandOnHover />
                    </Link>
                </Box>
                <Stack direction={'row'} spacing={2} sx={{mr: 2}}>
                    <ToggleView></ToggleView>
                    <IconButton>
                        <HelpOutlineIcon sx={{color: "primary.contrastText"}}/>
                    </IconButton>
                </Stack>
                <Stack>
                    <IconButton>
                            <HelpOutlineIcon/>
                        </IconButton>
                    </Stack>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;
