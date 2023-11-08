import { useQuery } from "react-query";
import BasePage from "../components/BasePage/BasePage";
import axios from "axios";
import { Card, Container, Grow, LinearProgress, Stack, Typography } from "@mui/material";
import SramsEvent, { EventType } from "../event";
import useAlert from "../hooks/useAlert";
import { EventBusyTwoTone, Login, Logout, QuestionMarkTwoTone } from "@mui/icons-material";

function FormatUnix(unix:number) {
    const lenDiff = 13 - `${unix}`.length;
    if (lenDiff > 0) {
        unix *= 10**lenDiff;
    }
    return unix;
}

function EventTypeIcon(props: {eventType: string}) {
    const type = EventType[props.eventType];
    console.log(props.eventType);
    
    if (type == EventType.PRESENCE_NEW) return <Login color="success" />;
    if (type == EventType.PRESENCE_LEFT) return <Logout color="error" />;
    if (type == EventType.CANCEL_BOOKING) return <EventBusyTwoTone color="warning" />;
    return <QuestionMarkTwoTone color="warning" />;
}

function EventCard(props: {event: SramsEvent, index: number}) {
    const event = props.event;
    const dateTime = new Date(event.timeStamp);

    return (
        <Grow in={true} timeout={props.index * 100}>
            <Card sx={{padding: 2}}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <EventTypeIcon eventType={props.event.eventType} />
                    <Typography fontFamily={"Geist-UltraLight"}>room: {event.roomId}</Typography>
                    <Typography>[{event.eventType}]</Typography>
                    <Typography>{dateTime.getDate()} / {dateTime.getMonth()}</Typography>
                    <Typography>{dateTime.toLocaleTimeString()}</Typography>
                </Stack>
            </Card>
        </Grow>
    );
}

function EventLogPage() {
    const alert = useAlert();
    const {data: events, isLoading} = useQuery("allEvents", {
        queryFn: async () => {
            let { data: events }: {data:SramsEvent[]} = await axios.get(`${import.meta.env.VITE_SRAMS_API_ADDRESS}events/all`);
            events = events.map((e) => {e.timeStamp = FormatUnix(e.timeStamp); return e;});
            return events.sort((a, b) => b.timeStamp-a.timeStamp);
        },
        refetchInterval: 10 * 1000,
    });

    return (
        <BasePage alert={alert}>
            <Container>
                <Stack display={"flex"} flexDirection={"column"} gap={4}>
                    {isLoading 
                        ? <LinearProgress /> 
                        : events?.map((e:SramsEvent, i) => <EventCard event={e} index={i}/>)}
                </Stack>
            </Container>
        </BasePage>
    );
}

export default EventLogPage;