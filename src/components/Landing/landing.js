import React, { Component } from 'react';
import TopBlock from './TopBlock';
import Jobseekers from './Jobseekers';
import About from './About';
import CollabBlock from './collabBlock';

class Landing extends Component {
	render(){
		return(
			<div>
				<TopBlock />
				<About />
				<Jobseekers />
				<CollabBlock />
			</div>
		);
	}
}


export default Landing;