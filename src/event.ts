export enum EventType {
	PRESENCE_NEW,
	PRESENCE_LEFT,
	CANCEL_BOOKING,
	OPEN_BOOKING,
	CLOSE_WINDOW,
	OPEN_WINDOW,
}

type SramsEvent = {
	id: string;
	roomId: string;
	eventType: string;
	timeStamp: number;
};

export function eventToDescription(event: SramsEvent) {
	const eventType = EventType[event.eventType as keyof typeof EventType];
	switch (eventType) {
		case EventType.PRESENCE_NEW:
			return "is now occupied";
		case EventType.PRESENCE_LEFT:
			return "is now available";
		case EventType.CANCEL_BOOKING:
			return "A booking was cancelled";
		case EventType.OPEN_BOOKING:
			return "A booking was opened";
		case EventType.CLOSE_WINDOW:
			return "has reached good air quality, close the window";
		case EventType.OPEN_WINDOW:
			return "has reached bad air quality, open the window";
		default:
			return "Unknown event";
	}
}

export default SramsEvent;
