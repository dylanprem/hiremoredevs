import React, { Component } from 'react';
import './landing.css';
import './images/pencil.png';


class About extends Component {
	render(){
		return(
			<div className='row about-img'>
				<div className="opacity col-md-12 col-xs-12">
					<div className='col-md-8 col-md-offset-2 col-xs-12 about-container'>
							<h1 className='text-center'>About</h1>
							<p className='about-text'>In an attempt to bridge the gap between Developers and Recruiters, HireMoreDevs was created. 
							The intent of this web app is to get developers hired while also creating an interactive community where developers can 
							share ideas and even collaborate to create something new! We know that the hiring process for developers can be a rocky road, 
							and that's why we've made this app very simple for both developers and recruiters. And the best part about it is... it's absolutely free!</p>
					</div>
					<div className='col-md-12 col-xs-12'>					
						<div className='col-md-4 col-xs-12 text-center recruiters'>
							<h1 className="text-center job-text">POST JOBS</h1>
							<img src={"https://media.giphy.com/media/l4Epe8gPvTodwd8CQ/giphy.gif"} className='center-block img-responsive img-circle' alt="post-job-gif" />
							<p className='about-text'>
							Recruiters, once approved by an administrator, can post as many jobs as they'd like.
							</p>
						</div>
						<div className='col-md-4 col-xs-12 text-center job-seeker'>
							<h1 className="text-center job-text">SHOWCASE YOUR WORK</h1>
							<img src={"https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"} className='center-block img-responsive img-circle' alt="showcase-work-gif" />
							<p className='about-text'>
							Job seekers can spruce up their profiles, and showcase their best projects as well. Think of it as your own virtual resume.
							</p>
						</div>
						<div className='col-md-4 col-xs-12 text-center collabs'>
							<h1 className="text-center job-text">COLLABORATE</h1>
							<img src={"https://media.giphy.com/media/Dj8NIuXppqHAY/giphy.gif"} className='center-block img-responsive img-circle' alt="collab-gif" />
							<p className='about-text'>
							Developers can post ideas to the Collab Corner. Others can view your idea, share their thoughts, and even offer to collaborate with you.
							</p>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


export default About;