import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';

function Header(){
    return(
        <AppBar sx={{
            backgroundColor: "blue",
            height: "4rem",
            color: "white",
            fontWeight: "800",
            display: "flex",
            justifyContent: "center"
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
                    alignItems: "center",
                    marginLeft: "2rem"
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
