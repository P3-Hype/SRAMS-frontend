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

export default SramsEvent;
