import React, { Component } from 'react';


class JobSeekerSteps extends Component {
	render(){
		return(
			<div className="row">
				<div className='panel-group panel panel-default'>
					<div className='panel-body'>
						<ul className="list-group">
							<li className='list-group-item '>
								<h1 className='job-text'>Look for jobs!</h1>
								<p className='job-text'>View jobs by clicking on the <span className='signup-link'>Jobs</span> link.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Let them know you're interested!</h1>
								<p className='job-text'>Express interest in a job by filling out a short form, which will appear at the bottom of the job post page. This will let the job poster know that you are interested in this position.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Highlight yourself!</h1>
								<p className='job-text'>Click the <button className='btn yellow-button job-text'><span className='glyphicon glyphicon-stats'></span>Account</button> button to:
									<ul className='list-group'>
										<li className='list-group-item'>Edit your profile</li>
										<li className='list-group-item'>Add your best projects</li>
									</ul>
								</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Track jobs</h1>
								<p className='job-text'>View jobs you've expressed interest on the "Account" page as well.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}


export default JobSeekerSteps;