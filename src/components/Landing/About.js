import React, { Component } from 'react';
import './landing.css';
import './images/pencil.png'

class About extends Component {
	render(){
		return(
			<div className='row dark-bg'>
				<div className='col-md-8 col-md-offset-2'>
						<h1 className='text-center'>About</h1>
						<p className='about-text'>"At vero eos et accusamus et iusto odio dignissimos 
						ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
						 et quas molestias excepturi sint occaecati cupiditate non provident, similique 
						 sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. 
						 Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum 
						 soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat 
						 facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus 
						 autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut 
						 et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic 
						 tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur 
						 aut perferendis doloribus asperiores repellat."</p>
				</div>
				<div className='col-md-12'>
					<div className='col-md-4 text-center'>
						<div className='icon-wrapper-pencil text-center center-block'>
						</div>
						<p className='about-text'>
						At vero eos et accusamus et iusto odio dignissimos 
						ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
						 et quas molestias excepturi sint occaecati 
						</p>
					</div>
					<div className='col-md-4 text-center'>
						<div className='icon-wrapper-view text-center center-block'>
						</div>
						<p className='about-text'>
						At vero eos et accusamus et iusto odio dignissimos 
						ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
						 et quas molestias excepturi sint occaecati 
						</p>
					</div>
					<div className='col-md-4 text-center'>
						<div className='icon-wrapper-collab text-center center-block'>
						</div>
						<p className='about-text'>
						At vero eos et accusamus et iusto odio dignissimos 
						ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
						 et quas molestias excepturi sint occaecati 
						</p>
					</div>
				</div>
			</div>
		);
	}
}


export default About;