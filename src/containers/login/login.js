import React, { Component } from 'react';
import LoginForm from './components/login-form';

import { NotificationManager } from 'react-notifications';
import PATHS from '../../constants/routes';

import API from '../../services/API';
import history from '../../helpers/history';

const { MAIN } = PATHS;

class Login extends Component {

	_submit = values => {
		API.login(values)
			.then(({ data: { token, message, admin }, }) => {
				localStorage.setItem('token', token);
				localStorage.setItem('isAuthorized', true);
				localStorage.setItem('admin', JSON.stringify(admin));
				NotificationManager.success(message, 'Success!', 5000);
				history.push(MAIN);
			})
			.catch(err => {
				console.log(err);
				NotificationManager.error(err.response.data.message.message , 'Error!', 5000)
			});
	};

	render() {
		return <div>
			<LoginForm onSubmit={this._submit}/>
		</div>
	}
}

export default Login;