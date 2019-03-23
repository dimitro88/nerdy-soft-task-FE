import React, { Component } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { NotificationManager } from 'react-notifications'
import AwesomeDebouncePromise from 'awesome-debounce-promise';

import StationList from './components/stations-list';
import EditStationModal from './components/edit-station-modal';
import CreateStationModal from './components/create-station-modal';

import API from '../../services/API';
import Auth from '../../services/Auth';
import history from '../../helpers/history';
import PATHS from '../../constants/routes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	getListOfRadioStations,
	removeStationByID,
	editStationByID,
	createStation,
	addFavourite
} from '../../actions/stations';

import '../../styles/main-page.css';
const { LOGIN, REGISTER } = PATHS;

class MainPage extends Component {

	constructor() {
		super();
		this.state = {
			radioName: '',
			activeID: '',
			openEdit: false,
			openCreate: false,
			editedStation: {},
			isAuthorized: false,
			myFavourite: []
		};
		this.audoiRef = React.createRef();
	}

	componentDidMount() {
		this._getListOfStation();
		JSON.parse(localStorage.getItem('isAuthorized')) === true && this.setState({ isAuthorized: true });
		localStorage.getItem('admin') && this.setState({ myFavourite: JSON.parse(localStorage.getItem('admin')).myFavourite || [] })
 	}

 	_getListOfStation = () => {
	  API.getListOfStations()
		  .then(({ data }) => {
			  this.props.getListOfRadioStations(data);
		  })
		  .catch(err => {
			  console.error(err)
		  });
  };

	_deleteStation = (e, id) => {
		e.stopPropagation();
		API.removeStationByID(id)
			.then(({data : { _id }}) => this.props.removeStationByID(_id))
			.catch(({ response : { status }}) => {
				status === 403 && NotificationManager.error("Only signed in user can remove stations", "Error!", 5000)
			})
	};

	_play = (url, name, id) => {
		if(this.audoiRef.current.paused || this.audoiRef.current.src !== url){
			this.audoiRef.current.src = url;
			this.audoiRef.current.play();
			this.setState({ radioName: name, activeID: id });
		} else {
			this.audoiRef.current.pause();
			this.setState({ activeID: ''});
		}
	};

	_editItemModal = (e, station) => {
		e.stopPropagation();
		this.state.isAuthorized ?
			this.setState({ openEdit: true, editedStation: station}) :
			NotificationManager.error("Only signed in user can edit stations", "Error!", 5000);
	};

	_editItem = values => {
		Object.keys(values).length ? API.editStationByID(this.state.editedStation._id, values)
			.then(({ data }) => {
				this.props.editStationByID(data);
				this.setState({ openEdit: false, editedStation: {}});
			})
			.catch(({ response : { status }}) => {
				status === 403 && NotificationManager.error("Only signed in user can edit stations", "Error!", 5000)
			}) : NotificationManager.error("Please fill at least 1 field", "Error!", 5000);
	};

	_logOut = () => {
		Auth.logOut();
		this.setState({ isAuthorized: false });
		this.setState({ myFavourite: [] });
	};

	_createItem = values => {
		API.createStation(values)
			.then(({ data }) => {
				this.props.createStation(data);
				this.setState({ openCreate: false});
			})
			.catch((error) => {
				console.log(error);
				error.response.status === 403 && NotificationManager.error("Only signed in user can create stations", "Error!", 5000)
			})
	};

	_addToFavourite = (id) => {
		console.log(id);
		API.addToFavourite(id, JSON.parse(localStorage.getItem('admin'))._id)
			.then(({ data : { admin, message } }) => {
				localStorage.setItem('admin', JSON.stringify(admin));
				this.setState({ myFavourite: admin.myFavourite });
				NotificationManager.success(message, "Success!", 5000)
			})
			.catch(error => {
				error.response.status === 403 && NotificationManager.error("Only signed in user can added stations to favourite", "Error!", 5000)
			})
	};

	_findRadioStationByName = async value => {
		if(!value) {
			this._getListOfStation()
		} else {
			API.findRadioAutocomplete(value)
				.then(({ data }) => this.props.getListOfRadioStations(data))
				.catch(err => NotificationManager.error("Something went wrong!", "Error!", 5000))
		}
	};

	_filterFindTextChanging = async value => {
		await this.asyncFindRadioStationByName(value);
	};

	asyncFindRadioStationByName = AwesomeDebouncePromise(
		this._findRadioStationByName,
		1000,
	);

	render() {
		return <div className="main-wrapper">
			<div className="list-wrapper">
				<div className="menu">
					<div className="logo">
						RadioHub
					</div>
					<div className="menu-find-station-input">
						<InputGroup>
							<FormControl
								placeholder="search station"
								onChange={(e) => this._filterFindTextChanging(e.target.value)}
							/>
						</InputGroup>
					</div>
						{
							this.state.isAuthorized ?
								<div className="log-buttons">
									<Button variant="link" onClick={this._logOut}><span>Log out</span></Button>
									<Button variant="link" onClick={() => this.setState({ openCreate: true})}><span>Create</span></Button>
								</div>
								: <div className="log-buttons">
									<Button variant="link" onClick={() => history.push(LOGIN)}><span>Sign in</span></Button>
									<Button variant="link" onClick={() => history.push(REGISTER)}><span>Sign up</span></Button>
								</div>
						}
				</div>
				<div className="list-container">
					<div className="stations-list">
						{this.props.stationsArr.length ? <StationList
							stations={this.props.stationsArr}
							deleteItem={this._deleteStation}
							play={this._play}
							activeID={this.state.activeID}
							editItemModal={this._editItemModal}
							addToFavourite={this._addToFavourite}
							myFavourite={this.state.myFavourite}
						/> : null}
					</div>
				</div>
			</div>
			<div className="player-wrapper">
				<div className="player-container">
					<div className="player-title">
						{this.state.radioName !== '' ? <span>{this.state.radioName}</span> : <span>Choose station!</span>}
					</div>
					<div className="player">
						<audio controls ref={this.audoiRef} onPause={() => this.setState({ activeID: ''})}></audio>
					</div>
				</div>
			</div>
			<EditStationModal
				show={this.state.openEdit}
				onHide={() => this.setState({ openEdit: false})}
				element={this.state.editedStation}
				editItem={this._editItem}
			/>
			<CreateStationModal
				show={this.state.openCreate}
				onHide={() => this.setState({ openCreate: false})}
				createItem={this._createItem}
			/>
		</div>
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getListOfRadioStations,
	removeStationByID,
	editStationByID,
	createStation,
	addFavourite
}, dispatch);

const mapStateToProps = ({ stations : { stationsArr }}) => {
	return {
		stationsArr
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);