import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

function Header(){
    return(
        <AppBar position="relative" sx={{bgcolor:"primary.main"}}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    ml: 2
                }}>
                    <Logo expandOnHover />
                </Box>
                <Stack direction={'row'} spacing={2}>
                    <IconButton>
                        <HelpOutlineIcon/>
                    </IconButton>
                </Stack>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;
