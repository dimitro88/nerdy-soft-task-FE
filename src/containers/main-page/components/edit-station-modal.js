import React from 'react';
import EditStationForm from './edit-station-form';

import { Modal, Button } from 'react-bootstrap';

import '../../../styles/edit-station.css';

class EditStation extends React.Component{

	render() {
		const { editItem, show, onHide, element } = this.props;
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
					<span>Edit radio station - {element.name}</span>
				</Modal.Title>
				<div className="edit-form-header-close-button">
					<img src="https://image.flaticon.com/icons/svg/291/291202.svg" onClick={onHide}/>
				</div>
			</Modal.Header>
			<Modal.Body>
				<EditStationForm onSubmit={editItem}/>
			</Modal.Body>
			<Modal.Footer>
				<Button onClick={onHide} variant="link">Close</Button>
			</Modal.Footer>
		</Modal>
	}

}

export default EditStation;