import React from 'react';
import '../../../styles/main-page.css';

function StationList({ stations, deleteItem, editItemModal, activeID, play, addToFavourite, myFavourite }) {
	console.log(stations);
	return stations.map(({ name, photo, url, _id }, index) => {
		let favourite = myFavourite.some(favourite => favourite === _id);
		return <div key={index} className="list-item">
			<div className="list-item-bottom">
				<div className="list-item-img">
					<img src={photo}/>
				</div>
				<div className="list-item-play-button">
					<img src={activeID === _id ? "https://image.flaticon.com/icons/svg/189/189639.svg" : "https://image.flaticon.com/icons/svg/148/148744.svg"}
					     onClick={() => play(url, name, _id)}/>
				</div>
			</div>
			<div className="list-item-station-name">
				<span className={favourite ? "favourite-title" : null }>{name}</span>
				<div className="delete-item" onClick={(e) => deleteItem(e, _id)}>
					<img src="https://image.flaticon.com/icons/svg/1538/1538523.svg"/>
				</div>
				<div className="edit-item" onClick={(e) => editItemModal(e, {name, photo, url, _id})}>
					<img src="https://image.flaticon.com/icons/svg/181/181540.svg"/>
				</div>
				<div className="add-item" onClick={(e) => addToFavourite(_id)}>
					<img src={favourite ? "https://image.flaticon.com/icons/svg/149/149706.svg" : "https://image.flaticon.com/icons/svg/25/25304.svg"}/>
				</div>
			</div>
		</div>
	})
}

export default StationList;