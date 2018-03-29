import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

class AddCollab extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			title:'',
			description: '',
			time: '',
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
	  e.preventDefault();
	  this.props.history.push(routes.COLLAB_CORNER);
	  const collabsRef = firebase.database().ref('Collabs');
	  const Collabs = {
	  		uid: this.state.authUser.uid,
			title: this.state.title,
			description: this.state.description,
			time: new Date().toLocaleString()

	}

	collabsRef.push(Collabs);
	  this.setState({
			title:'',
			description:'',
			time:''
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
			<div>
			{this.state.authUser ?
			<div className='col-md-4 col-md-offset-4'>
				<h1 className='text-center'>ADD COLLAB</h1>
				<form className='job-text'>
					<div className='form-group'>
						<label>Title:</label>
						<input className='form-control' name="title" value={this.state.title} onChange={this.handleChange} />
					</div>
					<div className='form-group'>
						<label>Description</label>
						<textarea className='form-control' name="description" rows="5" value={this.state.description} onChange={this.handleChange} />
					</div>
					<br />
					<div className='text-center'>
						<button className='btn yellow-button' onClick={this.handleSubmit}>Post</button>
					</div>
				</form>
			</div>
			:
			null}
			</div>
		);
	}
}

export default AddCollab;