import { Alert, Box, Collapse, List, ListItem, Paper, Skeleton } from "@mui/material";
import useAllEvents from "../../hooks/useEvents";
import SramsEvent from "../../event";
import { TransitionGroup } from 'react-transition-group';

interface SramsAlertProps {
    readonly event: SramsEvent,
}

function SramsAlert(props: SramsAlertProps) {
    return (
        <Alert severity="error" sx={{width: "100%"}}>
            {props.event.id}
        </Alert>
    );
}

function DashboardAlerts() {
    const {events, isLoading} = useAllEvents();

    if (isLoading) return <Skeleton variant="rounded" height={"100%"} />

    return (
        <Paper sx={{maxHeight: "100%", height:"100%", display: "flex", overflow: "hidden", flex: 1}}>
            {/* <Box height={"110%"} width={"100%"} sx={{backgroundColor: "red"}}></Box> */}
            <List sx={{height: "100%", width:"100%"}}>
                <TransitionGroup>
                    {events?.map((e, i) => <Collapse orientation="vertical"><ListItem><SramsAlert key={e.id} event={e}/></ListItem></Collapse>)}
                </TransitionGroup>
            </List>
        </Paper>
    );
}

export default DashboardAlerts;
