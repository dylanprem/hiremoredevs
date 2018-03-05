import React, { Component } from 'react';
import JobSeekers from './JobSeekerFeed';
import JobFeed from './JobFeed';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';


const DualFeed = (props, { authUser }) =>


  	<div className='container-fluid'>
		<div className='col-md-6'>
			<JobSeekers />
		</div>
		<div className='col-md-6'>
			<JobFeed />
		</div>
	</div>


DualFeed.contextTypes = {
  authUser: PropTypes.object,

};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DualFeed);

