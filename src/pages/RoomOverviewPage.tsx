import { Box, Container, Stack, Typography } from "@mui/material";
import BasePage from "../components/BasePage/BasePage";
import RoomStatusCard from "../components/RoomStatusCard/RoomStatusCard";
import Timeline from "../components/TimeClock/Timeline";
import useAlert from "../hooks/useAlert";

function RoomOverviewPage() {
  const alert = useAlert();

  return (
    <BasePage alert={alert}>
      <Container>
        <Typography>Suggestions:</Typography>
        <Stack spacing={2} direction="row" ml={4}>
          <RoomStatusCard />
          <RoomStatusCard />
          <RoomStatusCard />
        </Stack>
        <Box>
          <Timeline
            rooms={[
              { name: "Room 1", reservations: [{ start: 9, end: 12 }] },
              {
                name: "Room 2",
                reservations: [
                  { start: 13, end: 16 },
                  { start: 17, end: 19 },
                ],
              },
            ]}
          />
        </Box>
      </Container>
    </BasePage>
  );
}

export default RoomOverviewPage;
