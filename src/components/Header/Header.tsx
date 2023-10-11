import { AppBar, Box, Button, Stack, Toolbar } from '@mui/material';
import Logo from '../Logo/Logo';

interface HeaderRoutingProps {

};

function Header(props: HeaderRoutingProps){
    return(
        <AppBar sx={{
            color: "primary"
        }}>
            <Toolbar>
                <Box sx={{
                    flexGrow: "1",
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
