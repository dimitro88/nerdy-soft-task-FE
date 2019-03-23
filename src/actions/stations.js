export const GET_LIST = 'GET_LIST';
export const REMOVE_STATION_BY_ID = 'REMOVE_STATION_BY_ID';
export const EDIT_STATION_BY_ID = 'EDIT_STATION_BY_ID';
export const CREATE_STATION = 'CREATE_STATION';
export const ADD_FAVOURITE = 'ADD_FAVOURITE';

export const getListOfRadioStations = stations => ({
	type : GET_LIST,
	stations
});

export const removeStationByID = id => ({
	type: REMOVE_STATION_BY_ID,
	id
});

export const editStationByID = station => ({
	type: EDIT_STATION_BY_ID,
	station
});

export const createStation = station => ({
	type: CREATE_STATION,
	station
});

export const addFavourite = ({ _id }) => {
	return {
	type: ADD_FAVOURITE,
	_id
}};