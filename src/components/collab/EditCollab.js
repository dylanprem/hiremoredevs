import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import './collab.css';
import SignInForm from '../Auth/login';

class EditCollab extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			currentCollab: this.props.match.params.currentCollab,
			Collabs:[],
			Comments:[],
			Profiles:[],
			commentBody:'',
			time:'',
			hasComments: false
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
	  const collabsRef = firebase.database().ref('Collabs/' + this.state.currentCollab);
	  const Collabs = {
			title: this.title.value,
			description: this.description.value,
			time: new Date().toLocaleString(),
			frameworkOne:this.frameworkOne.value,
			frameworkTwo:this.frameworkTwo.value,
			frameworkThree:this.frameworkThree.value,
			lookingFor: this.lookingFor.value

	}

	collabsRef.update(Collabs);
	  this.setState({
			title:'',
			description:'',
			time:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
	  });
	  this.props.history.push(`/view-collab/${this.state.currentCollab}`);
	}


	componentDidMount(){
		const collabsRef = firebase.database().ref('Collabs/' + this.state.currentCollab);
		collabsRef.once('value', (snapshot) => {
			let Collabs = snapshot.val();
			let newState = [];			
			newState.push({
				id: this.state.currentCollab,
				title: snapshot.val().title,
				description: snapshot.val().description,
				name: snapshot.val().name,
				time: snapshot.val().time,
				uid: snapshot.val().uid,
				frameworkOne: snapshot.val().frameworkOne,
				frameworkTwo: snapshot.val().frameworkTwo,
				frameworkThree: snapshot.val().frameworkThree,
				lookingFor: snapshot.val().lookingFor,
			});
			
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
			<div className='profile-container'>
			{this.state.authUser ?
			<div>
			{this.state.Collabs.map((c) => {return(
			<div className='col-md-4 col-md-offset-4' key={c.id}>
				{c.uid === this.state.authUser.uid ?
				<div>
					<h1 className='text-center'>EDIT THIS COLLAB</h1>
					<form className='job-text'>
						<div className='form-group'>
							<h1>Title:</h1>
							<input className='form-control' name="title" defaultValue={c.title} ref={(title) => this.title = title} onChange={this.handleChange} />
						</div>
						<div className='form-group'>
							<h1>Description</h1>
							<textarea className='form-control' name="description" rows="5" defaultValue={c.description} ref={(description) => this.description = description} onChange={this.handleChange} />
						</div>
						<div className='form-group'>
							<h1>Framework One</h1>
							<input className='form-control' name="frameworkOne" defaultValue={c.frameworkOne} ref={(frameworkOne) => this.frameworkOne = frameworkOne} onChange={this.handleChange} />
						</div>
						<div className='form-group'>
							<h1>Framework Two</h1>
							<input className='form-control' name="frameworkTwo" defaultValue={c.frameworkTwo} ref={(frameworkTwo) => this.frameworkTwo = frameworkTwo} onChange={this.handleChange} />
						</div>
						<div className='form-group'>
							<h1>Framework Three</h1>
							<input className='form-control' name="frameworkThree" defaultValue={c.frameworkThree} ref={(frameworkThree) => this.frameworkThree = frameworkThree} onChange={this.handleChange} />
						</div>
						<div className='form-group'>
							<h1>Looking For</h1>
							<textarea className='form-control' name="lookingFor" rows="5" defaultValue={c.lookingFor} ref={(lookingFor) => this.lookingFor = lookingFor} onChange={this.handleChange} />
						</div>
						<br />
						<div className='text-center'>
							<button className='btn yellow-button' onClick={this.handleSubmit}>Save</button>
						</div>
						<br />
					</form>
				</div>
				:
				<div className='text-center'>
					<h1 className='job-text text-danger alert alert-danger'>You cannot edit someone elses collab!</h1>
				</div>
				}
			</div>
			);})}
			</div>
			:
			null}
			</div>
		);
	}
}

export default withRouter(EditCollab);