import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../theme";

type TimelineProps = {
  rooms: { name: string; reservations: { start: number; end: number }[] }[];
};

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

  return (
    <Container>
      {rooms.map((room) => (
        <Box key={room.name} display="flex" alignItems="center" mb={2}>
          <Typography variant="body1">{room.name}</Typography>
          <Box flexGrow={1}>
            <Box
              sx={{
                position: "relative",
                height: "20px",
                backgroundColor: "white",
              }}
            >
              {room.reservations.map((reservation) => (
                <Box
                  key={`${reservation.start}-${reservation.end}`}
                  sx={{
                    position: "absolute",
                    ...calculateOccupiedPosition(
                      reservation.start,
                      reservation.end
                    ),
                    top: 0,
                    bottom: 0,
                    backgroundColor: "red",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 4px",
                  }}
                >
                  <Typography variant="caption" color="white">
                    {`${reservation.start}:00`}
                  </Typography>
                  <Typography variant="caption" color="white">
                    {`${reservation.end}:00`}
                  </Typography>
                </Box>
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
