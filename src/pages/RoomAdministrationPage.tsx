import BasePage from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Chip, Container, Stack, Tooltip } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useAllRooms } from "../hooks/useRoom";
import { Co2, Thermostat, WaterDropTwoTone, DirectionsWalk } from "@mui/icons-material";

type Room={
    name: string;
    id: string;
}


function RoomAdministrationPage() {
    const alert = useAlert();
    const allRooms = useAllRooms();

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
                                    <Tooltip title="Co2">
                                        <Co2 />
                                    </Tooltip>
                                    <Tooltip title="Temperature">
                                        <Thermostat />
                                    </Tooltip>
                                    <Tooltip title="Humidity">
                                        <WaterDropTwoTone />
                                    </Tooltip>
                                    <Tooltip title="Passive Infrared">
                                        <DirectionsWalk />
                                    </Tooltip>
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