import React, { Component } from 'react';


class RecruiterSteps extends Component {
	render(){
		return(
			<div className="row">
				<div className='panel-group panel panel-default'>
					<div className='panel-body'>
						<ul className="list-group">
							<li className='list-group-item '>
								<h1 className='job-text'>Step 1:</h1>
								<p className='job-text'>Sign in and register as a recruiter by clicking the <button className='btn yellow-button job-text'>Recruiter Registration</button> button.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Step 2:</h1>
								<p className='job-text'>Fill out the Registration form. You'll need to provide your LinkedIn url to verify your identity, and employer.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Step 3:</h1>
								<p className='job-text'>Once approved, you can now post jobs by clicking the <span className='signup-link job-text'>Post Job</span> link. You would have to wait for each job to be approved by an Administrator before posting a new one.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Step 4:</h1>
								<p className='job-text'>You can manage jobs that you've posted by clicking the <button className='btn yellow-button job-text'><span className='glyphicon glyphicon-cog'></span> Manage Jobs</button> button. Once here, you can view all jobs posted by you, and/or delete a job post.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}


export default RecruiterSteps;