import React, { Component } from 'react';


class CollabSteps extends Component {
	render(){
		return(
			<div className="row">
				<div className='panel-group panel panel-default'>
					<div className='panel-body'>
						<ul className="list-group">
							<li className='list-group-item '>
								<h1 className='job-text'>Post your innovative idea!</h1>
								<p className='job-text'>Post to the Collab Corner clicking on the <span className='signup-link'>Collab Corner</span> link.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Track your collabs</h1>
								<p className='job-text'>You can track collabs you've posted in the account overview page.</p>
							</li>
							<li className='list-group-item'>
								<h1 className='job-text'>Give feedback!</h1>
								<p className='job-text'>Let other users know what you think about their idea, or let them know you want to collab with them by leaving a comment
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}


export default CollabSteps;