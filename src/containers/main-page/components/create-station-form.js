import React from 'react';
import BForm from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { reduxForm, Form, Field } from 'redux-form';

import { required, url } from '../../../helpers/validators';

import '../../../styles/create-station.css';

const renderTextField = props => {

	const {
		placeholder,
		type,
		input,
		meta: { touched, error }
	} = props;

	return <div>
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

function EditStationForm({ handleSubmit }) {

	return <div className="create-station-form-container">
		<Form onSubmit={handleSubmit}>
			<div className="create-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Name</BForm.Label>
					<Field
						type="text"
						name="name"
						className="create-form-input"
						placeholder="enter name please"
						component={renderTextField}
						validate={required}
					/>
				</BForm.Group>
			</div>
			<div className="create-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Radio stream url</BForm.Label>
					<Field
						type="text"
						name="url"
						className="create-form-input"
						placeholder="enter url please"
						component={renderTextField}
						validate={[required, url]}
					/>
				</BForm.Group>
			</div>
			<div className="create-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Photo url</BForm.Label>
					<Field
						type="text"
						name="photo"
						className="create-form-input"
						placeholder="enter url please"
						component={renderTextField}
						validate={[required, url]}
					/>
				</BForm.Group>
			</div>
			<div className="create-form-submit-button">
				<Button variant="link" type="submit">Create</Button>
			</div>
		</Form>
	</div>
}

EditStationForm = reduxForm({
	form: 'createStation'
})(EditStationForm);


export default EditStationForm;