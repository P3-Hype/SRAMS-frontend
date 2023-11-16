import { Person, PersonOff } from "@mui/icons-material";
import { EventType } from "../../event";
import { SxProps, Theme } from "@mui/material";

interface MetricAutoIconProps {
	readonly type: EventType;
	readonly color?: string;
}

function EventAutoIcon(props: MetricAutoIconProps) {
	const event = props.type;
	const sxProps: SxProps<Theme> = props.color ? { color: props.color } : {};

    return (
        <>
            {event == EventType.PRESENCE_LEFT && <PersonOff sx={sxProps} />}
            {event == EventType.PRESENCE_NEW && <Person sx={sxProps} />}
        </>
    );
	
}

export default EventAutoIcon;