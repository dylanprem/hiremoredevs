import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SignInForm from '../Auth/login';

class CollabList extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			Collabs:[],
			Profiles:[]
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
					time: Collabs[collab].time,
					uid: Collabs[collab].uid
				});
			}
			this.setState({
				Collabs: newState
			});
		});

		const profilesRef = firebase.database().ref('Profiles' );
		profilesRef.once('value', (snapshot) => {
		    let Profiles = snapshot.val();
		    let newState = [];
		    for (let profile in Profiles){
		      newState.push({
		        id: profile,
		        uid: Profiles[profile].uid,
		        name: Profiles[profile].name,
		        profilePicture: Profiles[profile].profilePicture
		       });
		    }
		    this.setState({
		      Profiles: newState
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
								<h2 className='collab-title'>{collab.title}</h2>
								{this.state.Profiles.map((profile) => {
		                      	return(
		                      		<div key={profile.id}>
		                      		{collab.uid === profile.uid ?
		                      		<div className='job-text text-center'>
		                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}><img src={profile.profilePicture} className='center-block img-responsive img-circle profile-pic' style={{width:80, height:80}} /></Link>
		                      		<p><small className='text-muted'>From:</small> {profile.name}</p>
		                      		</div>
		                      		:
		                      		null
		                      		
		                      		}
		                      		</div>
			                      	);
			                    })}
								
								<p>{collab.time}</p>
								<p><Link className='btn yellow-button' to={`/view-collab/${collab.id}`}>View</Link></p>
								<p>{collab.uid === this.state.authUser.uid ?
									<button className='btn btn-danger' onClick={() => this.removeItem(collab.id)}><span className='glyphicon glyphicon-trash'></span> DELETE</button>
									:
									null
								}
								</p>
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