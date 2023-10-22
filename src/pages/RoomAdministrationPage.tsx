import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Chip, Container, Stack } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useAllRooms } from "../hooks/useRoom";

type Room={
    name: string;
    id: string;
}


function RoomAdministrationPage() {
    const alert = useAlert();
    const allRooms = useAllRooms();
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
                    {!allRooms.isLoading && allRooms.rooms.map((r: Room)=> (
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                                    <Typography>{r.name}</Typography>
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

                    
                        <Button size="large" variant="contained" color="primary" fullWidth onClick={addClickHandeler}>
                            <Typography variant="h6">Add more Roms</Typography>
                        </Button>

                </Box>
            </Container>
            
            
        </BasePage>
    );
}

export default RoomAdministrationPage;