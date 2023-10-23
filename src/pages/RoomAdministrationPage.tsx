import {
  Co2,
  DirectionsWalk,
  Thermostat,
  WaterDropTwoTone,
  ExpandMoreIcon,
  SettingsIcon
} from "@mui/icons-material";
import {
    Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Container,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Room from "../room";
import { BasePage } from "../components/BasePage/BasePage";
import useAlert from "../hooks/useAlert";
import { useAllRooms } from "../hooks/useRoom";
import { Link as RouterLink } from "react-router-dom";


function RoomAdministrationPage() {
  const alert = useAlert();
  const allRooms = useAllRooms();

    return (
        <BasePage alert={alert}>
            <Container>
                <Card sx={{mb: 2}}>
                    {!allRooms.isLoading && allRooms.rooms?.map((r: Room) => (
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />} 
                            sx={{width:"100%"}} 
                            aria-controls="panel1a-content" 
                            id="panel1a-header">
                                <Typography>{r.name}</Typography>
                                <Stack mr={2} direction={"row-reverse"} gap={2} sx={{ alignItems: "center" }}>
                                    <IconButton component={RouterLink} to={"/room/" + r.id}>
                                            <SettingsIcon />
                                        </IconButton>
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
                </Card>    
                <Button size="large" variant="contained" color="primary" fullWidth>
                    <Typography variant="h6">Add more Roms</Typography>
                </Button>
            </Container>
        </BasePage>
    );
}

export default RoomAdministrationPage;
