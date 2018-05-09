import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


class Notifications extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			Comments:[],
			Profiles:[],
			Collabs:[],
			notify: false
		}
	}

	

	componentDidMount(){
		const collabsRef = firebase.database().ref('Collabs');
		collabsRef.once('value', (snapshot) => {
			let Collabs = snapshot.val();
			let newState = [];
			for (let collab in Collabs){
				newState.push({
					id: collab,
					title: Collabs[collab].title,
					description: Collabs[collab].description,
					time: Collabs[collab].time,
					uid: Collabs[collab].uid
				});
			}
			this.setState({
				Collabs: newState
			});
		});
	}


	render(){
		return(
			<div className='row'>
			{this.state.authUser ?
			<div className='col-md-12'>
				{this.state.notify ? <p className='job-text'>Someone commented on your idea</p> : null }
			</div>
			:
			null}
			</div>
		);
	}
}

export default Notifications;