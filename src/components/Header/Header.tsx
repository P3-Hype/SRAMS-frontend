import { AppBar, Box, IconButton, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ToggleView from '../ToggleView/ToggleView';

function Header(){
    return(
        <AppBar sx={{
            color: "primary"
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    ml: 2
                }}>
                    <Logo expandOnHover />
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
