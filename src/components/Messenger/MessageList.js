import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';


class MessageList extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			message:'',
			authUsersUID: '',
			Profiles:[],
			userToMessageName:'',
			Messages:[],
			canView: false,
		}
	}

	componentDidMount(){
		const profilesRef = firebase.database().ref('Profiles' );
		profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    for (let p in Profiles){
	      newState.push({
	        id: p,
	        name: Profiles[p].name,
	        uid: Profiles[p].uid
	      });
	    }
	    this.setState({
	      Profiles: newState
	    });
	  });



		firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        this.setState({authUsersUID: this.state.authUser.uid});
	      } 
    	});

    	firebase.database().ref('Profiles').once('value', (snapshot) => {
    		snapshot.forEach((childSnapshot) => {
    			if (childSnapshot.child("uid").val() === this.state.userToMessage) {
    				this.setState({userToMessageName: childSnapshot.child("name").val()});
    			}
    		});

    	});

    	firebase.database().ref('Messages').once('value', (snapshot) => {
    		snapshot.forEach((childSnapshot) => {
    			if (childSnapshot.child("messengerFromUID").val() === this.state.authUsersUID || childSnapshot.child("messengerToUID").val() === this.state.authUsersUID) {
    				this.setState({canView: true});
    				let Messages = snapshot.val();
				    let newState = [];
				      newState.push({
				      	id: childSnapshot.key,
				        messengerToUID: snapshot.val().messengerToUID,
				        messengerFromUID: snapshot.val().messengerFromUID,
				        message: snapshot.val().message
				      });
					    this.setState({
					     Messages: newState
					  });
    			}
    		});

    	});

	}

	render(){
		return(
			<div className='profile-container'>
			{this.state.authUser ?
			<div className='col-md-12'>

				<div>
					<h1 className='text-center job-text'>Your Messages</h1>

					<table class="table table-striped job-text">
						<thead>
						  <tr>
						    <th>Threads</th>
						    <th>View</th>
						  </tr>
						</thead>
						<tbody>
						  {this.state.Messages.map((m) =>{return(
						  <tr key={m.id}>
						    {this.state.Profiles.map((p) => {return(
						    	<td>{m.message}</td>
						    );})}
						    <td></td>
						  </tr>
						  );})}
						</tbody>
					</table>
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default withRouter(MessageList);