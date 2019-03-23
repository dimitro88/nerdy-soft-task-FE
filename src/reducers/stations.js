import {
	GET_LIST,
	REMOVE_STATION_BY_ID,
	EDIT_STATION_BY_ID,
	CREATE_STATION,
	ADD_FAVOURITE
} from "../actions/stations"

const initialState = {
	stationsArr : []
};

export default (state = initialState, action) => {
	switch(action.type){
		case GET_LIST:
			return {
				...state,
				stationsArr: [...action.stations],
			};
		case REMOVE_STATION_BY_ID:
			return {
				...state,
				stationsArr: state.stationsArr.filter(({ _id }) => _id !== action.id)
			};
		case EDIT_STATION_BY_ID:
			state.stationsArr[state.stationsArr.findIndex(({ _id }) => _id === action.station._id)] = action.station;
			return {
				...state,
				stationsArr: [...state.stationsArr]
			};
		case CREATE_STATION:
			return {
				...state,
				stationsArr: [...state.stationsArr, action.station]
			};
		case ADD_FAVOURITE:
			const item = state.stationsArr[state.stationsArr.findIndex(({ _id }) => _id === action._id)];
			item.isFavourite = !item.isFavourite;
			return {
				...state,
				stationsArr: [...state.stationsArr]
			};
		default: return state;
	}
}