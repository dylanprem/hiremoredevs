import React, { Component } from 'react';
import Employers from './Employers';
import Jobseekers from './Jobseekers';
import About from './About';

class Landing extends Component {
	render(){
		return(
			<div class='container-fluid'>
				<About />
				<Employers />
				<Jobseekers />
			</div>
		);
	}
}


export default Landing;