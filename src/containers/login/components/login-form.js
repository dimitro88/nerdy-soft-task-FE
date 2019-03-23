import React, { Component } from 'react';
import BForm from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { reduxForm, Form, Field } from 'redux-form';

import { required, password, login } from '../../../helpers/validators';
import PATHS from '../../../constants/routes';
import history from '../../../helpers/history';

import '../../../styles/login.css';

const { REGISTER } = PATHS;

const renderTextField = props => {

	const {
		placeholder,
		type,
		input,
		meta: { touched, error }
	} = props;

	return <div className="input-div-wrapper">
		<BForm.Control
			type={type}
			placeholder={placeholder}
			{...input}
			className="form-input"
			autoComplete="off"
		/>
		{touched && error && <span className="text-danger">{error}</span>}
	</div>

};

function LoginForm({ handleSubmit }){

	return <div className="login-page-body">
		<div className="login-wrapper">
			<Form onSubmit={handleSubmit}>
				<div className="login-title">
					<span>Sign in</span>
				</div>
				<div className="login-form-wrapper">
					<div className="form">
						<div className="login-field-wrapper">
							<BForm.Group>
								<BForm.Label>Login</BForm.Label>
								<Field
									type="text"
									name="login"
									className="form-input"
									placeholder="enter login please"
									component={renderTextField}
									validate={[required, login]}
								/>
							</BForm.Group>
						</div>
						<div className="login-field-wrapper">
							<BForm.Group>
								<BForm.Label>Password</BForm.Label>
								<Field
									type="password"
									name="password"
									className="form-input"
									placeholder="enter password please"
									component={renderTextField}
									validate={[required, password]}
								/>
							</BForm.Group>
						</div>
					</div>
				</div>
				<div className="login-buttons-container">
					<div className="login-buttons-wrapper">
						<Button type="submit" variant="link">Sign in</Button>
						<Button variant="link" onClick={() => history.push(REGISTER)}>To register</Button>
					</div>
				</div>
			</Form>
		</div>
	</div>
}

LoginForm = reduxForm({
	form: 'login'
})(LoginForm);


export default LoginForm;