import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';

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
                    <Button variant="contained">Knap</Button>
                    <Button variant="contained">Knap</Button>
                </Stack>
            </Toolbar>
            
        </AppBar>
    )
}

export default Header;
