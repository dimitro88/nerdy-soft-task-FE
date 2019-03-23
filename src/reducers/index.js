import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import stations from './stations';
import admin from './admin';

export default combineReducers({
	form: formReducer,
	stations,
	admin
});