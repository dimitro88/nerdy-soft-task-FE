import React, { Component } from 'react';
import BForm from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { reduxForm, Form, Field } from 'redux-form';

import { required, password, login } from '../../../helpers/validators';
import PATHS from '../../../constants/routes';
import history from '../../../helpers/history';

import '../../../styles/register.css';

const { LOGIN } = PATHS;

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

function RegisterForm({ handleSubmit }){

	return <div className="register-page-body">
		<div className="register-wrapper">
			<Form onSubmit={handleSubmit}>
				<div className="register-title">
					<span>Sign up</span>
				</div>
				<div className="register-form-wrapper">
					<div className="form">
						<div className="register-field-wrapper">
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
						<div className="register-field-wrapper">
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
						<div className="register-field-wrapper">
							<BForm.Group>
								<BForm.Label>First name</BForm.Label>
								<Field
									type="text"
									name="firstName"
									className="form-input"
									placeholder="enter name please"
									component={renderTextField}
									validate={required}
								/>
							</BForm.Group>
						</div>
						<div className="register-field-wrapper">
							<BForm.Group>
								<BForm.Label>Last name</BForm.Label>
								<Field
									type="text"
									name="lastName"
									className="form-input"
									placeholder="enter surname please"
									component={renderTextField}
									validate={required}
								/>
							</BForm.Group>
						</div>
					</div>
				</div>
				<div className="register-buttons-container">
					<div className="register-buttons-wrapper">
						<Button type="submit" variant="link">Sign up</Button>
						<Button variant="link" onClick={() => history.push(LOGIN)}>To login</Button>
					</div>
				</div>
			</Form>
		</div>
	</div>
}

RegisterForm = reduxForm({
	form: 'register'
})(RegisterForm);


export default RegisterForm;