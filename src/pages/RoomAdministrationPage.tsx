
import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, CardActions, Container } from "@mui/material";
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
                                <Typography>{r.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Her skal vi vel have nogle forskelige information omkring rummet. 
                                </Typography>
                                <Button variant="contained">Edit {r.name}</Button>
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