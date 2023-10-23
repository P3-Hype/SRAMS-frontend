import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

type TimelineProps = {
  rooms: string[];
};

const generateTimelineLabel = () => {
  const labels = [];
  for (let i = 8; i <= 21; i++) {
    labels.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return `Timeline: ${labels.join(" - ")}`;
};

const Timeline = ({ rooms }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const calculatePosition = () => {
    const startHour = 8;
    const endHour = 21;
    const currentHour = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    if (currentHour < startHour || currentHour > endHour) return null;

    const totalMinutes = (endHour - startHour) * 60;
    const elapsedMinutes = (currentHour - startHour) * 60 + currentMinutes;

    return (elapsedMinutes / totalMinutes) * 100;
  };

  const position = calculatePosition();
  const timelineLabel = generateTimelineLabel();

  return (
    <Container>
      <Typography variant="h6">{timelineLabel}</Typography>
      <Divider />
      {rooms.map((room, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom={2}>
          <Typography variant="body1">{room}</Typography>
          <Box flexGrow={1}>
            <div
              style={{
                position: "relative",
                height: "20px",
                backgroundColor: "white",
                marginLeft: "16px",
              }}
            >
              {position !== null && (
                <div
                  style={{
                    position: "absolute",
                    left: `${position}%`,
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: "red",
                  }}
                />
              )}
            </div>
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default Timeline;
