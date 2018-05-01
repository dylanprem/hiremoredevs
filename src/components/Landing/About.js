import React, { Component } from 'react';
import './landing.css';
import './images/pencil.png';
import hello from './images/hello.svg';

class About extends Component {
	render(){
		return(
			<div className='row dark-bg'>
				<div className='col-md-8 col-md-offset-2 about-container'>
						<img src={hello} className='img-responsive center-block' />
						<h1 className='text-center'>About</h1>
						<p className='about-text'>In an attempt to bridge the gap between Developers and Recruiters, HireMoreDevs was created. 
						The intent of this web app is to get developers hired while also creating an interactive community where developers can 
						share ideas and even collaborate to create something new! We know that the hiring process for developers can be a rocky road, 
						and that's why we've made this app very simple for both developers and recruiters. And the best part about it is... it's absolutely free!</p>
				</div>
				<div className='col-md-12'>
					<h1 className="text-center job-text">HOW IT WORKS</h1>
					<div className='col-md-4 text-center recruiters'>
						<img src={"https://media.giphy.com/media/l4Epe8gPvTodwd8CQ/giphy.gif"} className='center-block img-responsive img-circle' />
						<p className='about-text'>
						Recruiters, once approved by an administrator, can post as many jobs as they'd like.
						</p>
					</div>
					<div className='col-md-4 text-center job-seeker'>
						<img src={"https://media.giphy.com/media/3o7TKTiQWuZ0cOmAkE/giphy.gif"} className='center-block img-responsive img-circle' />
						<p className='about-text'>
						Job seekres can spruce up their profiles, and showcase their best projects as well. Think of it as your own virtual resume.
						</p>
					</div>
					<div className='col-md-4 text-center collabs'>
						<img src={"https://media.giphy.com/media/Dj8NIuXppqHAY/giphy.gif"} className='center-block img-responsive img-circle' />
						<p className='about-text'>
						Developers, hired or not, can post ideas to the Collab Corner. Others can view your idea, share their thoughts, and even offer to collaborate with you.
						</p>
					</div>
				</div>
			</div>
		);
	}
}


export default About;