/*
public class RoomSuggestion {
    private Room room;
    private double climateScore;
    private int availabilityTime;
*/

export type Room = {
	id: string;
	name: string;
	seatCount: number;
	hasWindow: boolean;
	isBookable: boolean;
	hasCo2: boolean;
	hasTemperature: boolean;
	hasHumidity: boolean;
};

export type RoomSuggestion = {
	room: Room;
	climateScore: number;
	availabilityTime: number;
};

export default Room;
