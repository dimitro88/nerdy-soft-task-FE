import React from 'react';
import BForm from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { reduxForm, Form, Field } from 'redux-form';

import '../../../styles/edit-station.css';

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

	return <div className="edit-station-form-container">
		<Form onSubmit={handleSubmit}>
			<div className="edit-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Name</BForm.Label>
					<Field
						type="text"
						name="name"
						className="edit-form-input"
						placeholder="enter name please"
						component={renderTextField}
					/>
				</BForm.Group>
			</div>
			<div className="edit-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Radio stream url</BForm.Label>
					<Field
						type="text"
						name="url"
						className="edit-form-input"
						placeholder="enter url please"
						component={renderTextField}
					/>
				</BForm.Group>
			</div>
			<div className="edit-station-form-field-wrapper">
				<BForm.Group>
					<BForm.Label>Photo url</BForm.Label>
					<Field
						type="text"
						name="photo"
						className="edit-form-input"
						placeholder="enter url please"
						component={renderTextField}
					/>
				</BForm.Group>
			</div>
			<div className="edit-form-submit-button">
				<Button variant="link" type="submit">Edit</Button>
			</div>
		</Form>
	</div>
}

EditStationForm = reduxForm({
	form: 'editStation'
})(EditStationForm);


export default EditStationForm;