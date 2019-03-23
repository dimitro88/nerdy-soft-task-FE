import React, { Component } from 'react';
import RegisterForm from './components/register-form';

import { NotificationManager } from 'react-notifications';
import PATHS from '../../constants/routes';

import API from '../../services/API';
import history from '../../helpers/history';

const { LOGIN } = PATHS;

class Register extends Component {

	_submit = values => {
		API.register(values)
			.then(({ data: { message }}) => {
				console.log(message);
				history.push(LOGIN);
				NotificationManager.success(message, 'Success!', 5000)
			})
			.catch(err => {
				NotificationManager.error(err.response.data.message.message , 'Error!', 5000)
			});
	};

	render() {
		return <div>
			<RegisterForm onSubmit={this._submit}/>
		</div>
	}
}

export default Register;