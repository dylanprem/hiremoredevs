import React, { Component } from 'react';
import Employers from './Employers';
import Jobseekers from './Jobseekers';
import About from './About';
import CollabBlock from './collabBlock';

class Landing extends Component {
	render(){
		return(
			<div class='container-fluid'>
				<About />
				<Employers />
				<Jobseekers />
				<CollabBlock />
			</div>
		);
	}
}


export default Landing;