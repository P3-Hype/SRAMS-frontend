import { Box, Container, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../theme";

//Denne type-definition specificerer, at Timeline-komponenten forventer en props-objekt med en nøgle rooms, der er en streng-array.
type TimelineProps = {
  rooms: string[];
};

/*
  i.toString() bliver brugt til at konvertere et tal til en streng.
  Derefter sammensættes denne streng med nullet ("0") indtil den når en længde af 2 karakterer.

  Eksempler:

  8.toString().padStart(2, "0") vil returnere "08"
  10.toString().padStart(2, "0") vil returnere "10"
*/
function generateTimelineLabel() {
  const startHour = 8;
  const endHour = 22;

  const labels = [];
  for (let i = startHour; i <= endHour; i++) {
    labels.push(`${i.toString().padStart(2, "0")}:00`);
  }
  return `Timeline: ${labels.join(" - ")}`;
}

const Timeline = ({ rooms }: TimelineProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  //Dette useEffect-hook opdaterer currentTime hvert sekund og rydder op efter sig, når komponenten fjernes.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Beregner alle de nødvendige variable, som bruges til at bestemme positionen af den røde streg.
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
      {rooms.map((room) => (
        <Box key={room} display="flex" alignItems="center" mb={2}>
          <Typography variant="body1">{room}</Typography>
          <Box flexGrow={1} ml={2}>
            <Box
              sx={{
                position: "relative",
                height: "20px",
                backgroundColor: "white",
              }}
            >
              {position !== null && (
                <Box
                  sx={{
                    position: "absolute",
                    left: `${position}%`,
                    top: 0,
                    bottom: 0,
                    width: "2px",
                    backgroundColor: theme.palette.secondary.main,
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
