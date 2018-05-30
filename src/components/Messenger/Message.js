import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import * as routes from '../../constants/routes';


class Message extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			message:'',
			userToMessage: props.match.params.userToMessageUID,
			authUsersUID: '',
			Profiles:[],
			userToMessageName:'',
			Messages:[],
			canView: false,



		}
	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}


	handleSubmit(e) {
	  const messageRef = firebase.database().ref('Messages');
	  const Messages = {
	  		messengerOneUID: this.state.authUser.uid,
	  		messengerTwoUID: this.state.userToMessage,
	  		messages: {
	  			message: this.state.message,
	  			uid: this.state.authUser.uid
	  		}
			
	}

	messageRef.push(Messages);
	  this.setState({
			message:''
	  });
}

	componentDidMount(){
		const messageRef = firebase.database().ref('Messages');
		messageRef.once('value', (snapshot) => {
			let Messages = snapshot.val();
			let newState = [];
			for (let m in Messages){
				newState.push({
					id: m,
					messengerOneUID: Messages[m].messengerOneUID,
					messengerTwoUID: Messages[m].messengerTwoUID,
					messages: {
						message: Messages[m].messages.message,
						uid: Messages[m].messages.uid,
					}
				});
			}
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
    			if (childSnapshot.child("messengerTwoUID").val() === this.state.userToMessage && childSnapshot.child("messengerOneUID").val() === this.state.authUsersUID) {
    				this.setState({canView: true});
    			}
    		});

    	});

	}

	render(){
		return(
			<div className='profile-container'>
			{this.state.authUser ?
			<div className='col-md-4 col-md-offset-4'>
				<div>
					<h1 className='text-center job-text'>Send a Message to <span>{this.state.userToMessageName}</span></h1>
					<form className='job-text'>
						<div className='form-group'>
							<h1>Message</h1>
							<textarea className='form-control' name="message" rows="5" value={this.state.message} onChange={this.handleChange} />
						</div>
						<br />
						<div className='text-center'>
							<button className='btn yellow-button' onClick={this.handleSubmit}>Post</button>
						</div>
						<br />
					</form>
				</div>
				<div>
				{this.state.Messages.map((m) => {return(
				<div key={m.id}>
					<p>m.me</p>
				</div>
				);})}
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default withRouter(Message);