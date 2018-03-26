import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class CollabList extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			Collabs:[]
		}
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(collabId) {
	    const collabsRef = firebase.database().ref(`Collabs/${collabId}`);
	    collabsRef.remove();
	    window.location.reload();
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
					name: Collabs[collab].name,
					time: Collabs[collab].time,
					uid: Collabs[collab].uid
				});
			}
			this.setState({
				Collabs: newState
			});
		});

		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	      } 
    	});
	}

	render(){
		return(
			<div className='row'>
			{this.state.authUser ?
			<div className='col-md-12'>
				<table className='table'>
					<tbody className='job-text'>
					{this.state.Collabs.map((collab) => {
						return(
						<tr key={collab.id}>
							<td className='text-center'>
								<h2>{collab.title}</h2>
								<p><small className='text-muted'>From:</small> {collab.name}</p>
								<p>{collab.time}</p>
								<p><Link className='btn yellow-button' to={`/view-collab/${collab.id}`}>View</Link></p>
								<p><button className='btn btn-danger' onClick={() => this.removeItem(collab.id)}>DELETE</button></p>
							</td>
						</tr>
						);
					})}
					</tbody>
				</table>
				
			</div>
			:
			null}
			</div>
		);
	}
}

export default CollabList;