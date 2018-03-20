import React from 'react';
import JobFeed from './JobFeed';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';


const DualFeed = (props, { authUser }) =>


  	<div className='container-fluid'>
  
		
		<div className='row'>
			<JobFeed />
		</div>
	</div>


DualFeed.contextTypes = {
  authUser: PropTypes.object,

};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(DualFeed);

