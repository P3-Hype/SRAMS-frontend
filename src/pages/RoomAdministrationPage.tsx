
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, CardActions, Chip, Container, Stack } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useState } from "react";

type Room={
    name: string;
    id: string;
}


function RoomAdministrationPage() {
    const alert = useAlert();
    const [rooms, setRooms] = useState<Room[]>([
        {name: "Room1", id: "1"},
        {name: "Room2", id: "2"},
        {name: "Room3", id: "3"}
    ]);

    const addClickHandeler = ()=>{setRooms([...rooms,{name: "newRoom", id: "000"}])}



    return (
        <BasePage alert={alert}>
            <Container>
                <Box>
                    {rooms.map(r=> (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                <Box sx={{alignItems:"center"}}>
                                    <Typography>{r.name}</Typography>
                                </Box>
                                <Stack direction={"row-reverse"} gap={2} sx={{width:"100%", alignItems:"center"}}>
                                    <Button variant="contained">
                                        <SettingsIcon />
                                    </Button>
                                    <Chip label="Temperature"/>
                                    <Chip label="Humidity"/>
                                    <Chip label="Co2"/>
                                    
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Her skal vi vel have nogle forskelige information omkring rummet.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}

                    
                    <CardActions sx={{ justifyContent: "center" }}>
                        <Button size="large" variant="contained" color="primary" fullWidth onClick={addClickHandeler}>
                            <Typography variant="h6">Add more Roms</Typography>
                        </Button>
                    </CardActions>

                </Box>
            </Container>
            
            
        </BasePage>
    );
}

export default RoomAdministrationPage;