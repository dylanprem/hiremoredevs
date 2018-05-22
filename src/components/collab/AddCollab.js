import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import SignInForm from '../Auth/login';

class AddCollab extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			title:'',
			description: '',
			time: '',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
			lookingFor:'',
			Collabs:[]
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
	  this.props.history.push(routes.COLLAB_CORNER);
	  const collabsRef = firebase.database().ref('Collabs');
	  const Collabs = {
	  		uid: this.state.authUser.uid,
			title: this.state.title,
			description: this.state.description,
			time: new Date().toLocaleString(),
			frameworkOne:this.state.frameworkOne,
			frameworkTwo:this.state.frameworkTwo,
			frameworkThree:this.state.frameworkThree,
			lookingFor: this.state.lookingFor

	}

	collabsRef.push(Collabs);
	  this.setState({
			title:'',
			description:'',
			time:'',
			frameworkOne:'',
			frameworkTwo:'',
			frameworkThree:'',
	  });
}

	componentDidMount(){
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
			<div className='col-md-4 col-md-offset-4'>
				<h1 className='text-center'>ADD A COLLAB</h1>
				<form className='job-text'>
					<div className='form-group'>
						<h1>Title:</h1>
						<input className='form-control' name="title" value={this.state.title} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<h1>Description</h1>
						<textarea className='form-control' name="description" rows="5" value={this.state.description} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<h1>Framework One</h1>
						<input className='form-control' name="frameworkOne" value={this.state.frameworkOne} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<h1>Framework Two</h1>
						<input className='form-control' name="frameworkTwo" value={this.state.frameworkTwo} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<h1>Framework Three</h1>
						<input className='form-control' name="frameworkThree" value={this.state.frameworkThree} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<h1>Looking For</h1>
						<textarea className='form-control' name="lookingFor" rows="5" value={this.state.lookingFor} onChange={this.handleChange} />
					</div>
					<br />
					<div className='text-center'>
						<button className='btn yellow-button' onClick={this.handleSubmit}>Post</button>
					</div>
					<br />
				</form>
			</div>
			:
			null}
			</div>
		);
	}
}

export default AddCollab;