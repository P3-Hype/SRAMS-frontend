import { EditCalendar, EventBusy, Person, PersonOff, PriorityHigh, QuestionMark, RollerShades } from "@mui/icons-material";
import { EventType } from "../../event";
import { SxProps, Theme } from "@mui/material";

interface MetricAutoIconProps {
	readonly type: EventType;
	readonly color?: string;
}

function EventAutoIcon(props: MetricAutoIconProps) {
	const event = props.type;
	const sxProps: SxProps<Theme> = props.color ? { color: props.color } : {};

    switch (event) {
        case EventType.PRESENCE_LEFT:
            return <PersonOff sx={sxProps} />;
        case EventType.PRESENCE_NEW:
            return <Person sx={sxProps} />;
        case EventType.CANCEL_BOOKING:
            return <EventBusy sx={sxProps} />;
        case EventType.OPEN_BOOKING:
            return <EditCalendar sx={sxProps} />;
        case EventType.CLOSE_WINDOW:
            return <PriorityHigh sx={sxProps} />;
        case EventType.OPEN_WINDOW:
            return <RollerShades sx={sxProps} />;
        default:
            return <QuestionMark sx={sxProps} />;
    }
}

export default EventAutoIcon;