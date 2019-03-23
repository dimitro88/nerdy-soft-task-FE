import {
	SAVE_ADMIN_INFO
} from "../actions/admin"

const initialState = {
	adminInfo : {}
};

export default (state = initialState, action) => {
	switch(action.type) {
		case SAVE_ADMIN_INFO:
			return {
				...state,
				adminInfo: action.admin,
			};
		default: return state;
	}
}