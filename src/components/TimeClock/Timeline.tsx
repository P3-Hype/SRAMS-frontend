import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../theme";

type TimelineProps = {
  rooms: { name: string; reservations: { start: number; end: number }[] }[];
};

function generateTimelineLabel() {
  const startHour = 8;
  const endHour = 22;
  const labels = [];
  for (let i = startHour; i <= endHour; i++) {
    labels.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return `Timeline: ${labels.join(" ")}`;
}

const Timeline = ({ rooms }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const startHour = 8;
  const endHour = 22;
  const totalHours = endHour - startHour;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculateOccupiedPosition = (start: number, end: number) => {
    const startPosition = ((start - startHour) / totalHours) * 100;
    const endPosition = ((end - startHour) / totalHours) * 100;
    return {
      left: `${startPosition}%`,
      width: `${endPosition - startPosition}%`,
    };
  };

  const position = ((currentTime.getHours() - startHour) / totalHours) * 100;

  const timelineLabel = generateTimelineLabel();

  return (
    <Container>
      <Typography variant="h6">{timelineLabel}</Typography>
      <Divider />
      {rooms.map((room) => (
        <Box key={room.name} display="flex" alignItems="center" mb={2}>
          <Typography variant="body1">{room.name}</Typography>
          <Box flexGrow={1} ml={2}>
            <Box
              sx={{
                position: "relative",
                height: "20px",
                backgroundColor: "white",
              }}
            >
              {room.reservations.map((reservation, index) => (
                <Box
                  key={index}
                  sx={{
                    position: "absolute",
                    ...calculateOccupiedPosition(
                      reservation.start,
                      reservation.end
                    ),
                    top: 0,
                    bottom: 0,
                    backgroundColor: "red",
                  }}
                />
              ))}
              {position !== null && (
                <Box
                  sx={{
                    position: "absolute",
                    left: `${position}%`,
                    top: 0,
                    bottom: 0,
                    width: "4px",
                    backgroundColor: theme.palette.primary.main,
                  }}
                />
              )}
            </Box>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default Timeline;
