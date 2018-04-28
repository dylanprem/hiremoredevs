import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as routes from '../../constants/routes';
import CollabList from './CollabList';
import SignInForm from '../Auth/login';

class CollabCorner extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null
		}
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
			<div>
				<div className='row text-center profile-container'>
					<img src={"https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/collaboration-128.png"} className='img-responsive center-block' />
					<h1 className='text-center'>COLLAB CORNER</h1>
					<Link className='btn yellow-button job-text' to={routes.ADD_COLLAB}><span className='glyphicon glyphicon-plus-sign'></span>&nbsp;&nbsp;Post Here</Link>

				</div>
				<div>
					<CollabList />
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default CollabCorner;