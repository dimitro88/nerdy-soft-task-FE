import React from 'react';
import CreateStationForm from './create-station-form';

import { Modal, Button } from 'react-bootstrap';

import '../../../styles/edit-station.css';

class CreateStation extends React.Component{

	render() {
		const { createItem, show, onHide } = this.props;
		return <Modal
			show={show}
			onHide={onHide}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="modal-window"
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					<span>Create radio station</span>
				</Modal.Title>
				<div className="edit-form-header-close-button">
					<img src="https://image.flaticon.com/icons/svg/291/291202.svg" onClick={onHide}/>
				</div>
			</Modal.Header>
			<Modal.Body>
				<CreateStationForm onSubmit={createItem}/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide} variant="link">Close</Button>
			</Modal.Footer>
		</Modal>
	}

}

export default CreateStation;