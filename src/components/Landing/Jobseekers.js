import React, { Component } from 'react';
import './landing.css'
import {Modal} from 'react-bootstrap';
import RecruiterSteps from './RecruiterSteps';
import JobSeekerSteps from './JobSeekerSteps';

class JobSeeker extends Component {
	constructor(props, context){
		super(props);
		this.state = {

		}
	this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowTwo = this.handleShowTwo.bind(this);
    this.handleCloseTwo = this.handleCloseTwo.bind(this);
	}

	handleClose() {
    	this.setState({ show: false });
  	}

  	handleShow() {
    	this.setState({ show: true });
  	}

  	handleCloseTwo() {
    	this.setState({ showTwo: false });
  	}

  	handleShowTwo() {
    	this.setState({ showTwo: true });
  	}
	render(){
		return(
			<div className='row seeker-img' >
				<div className='col-md-12 opacity'>
					<div className='col-md-12 inner'>
						<div className='col-md-6 text-center'>
							<h1 className='text-center'>Job Seekers</h1>
							<button onClick={this.handleShowTwo} className='btn black-button job-text'>Learn More</button>
						</div>
						<div className='col-md-6 text-center'>
							<h1 className='text-center'>Recruiters</h1>
							<button onClick={this.handleShow} className='btn black-button job-text'>Learn More</button>
						</div>
						<Modal show={this.state.show} onHide={this.handleClose}>
				          <Modal.Header closeButton>
				            <Modal.Title className='job-text text-center'>Recruiter Features</Modal.Title>
				          </Modal.Header>
				          <Modal.Body>
				            <RecruiterSteps />
				          </Modal.Body>
				          <Modal.Footer>
				            <button className='job-text yellow-button btn' onClick={this.handleClose}>Close</button>
				          </Modal.Footer>
				        </Modal>
				        <Modal show={this.state.showTwo} onHide={this.handleCloseTwo}>
				          <Modal.Header closeButton>
				            <Modal.Title className='job-text text-center'>Job Seeker Features</Modal.Title>
				          </Modal.Header>
				          <Modal.Body>
				            <JobSeekerSteps />
				          </Modal.Body>
				          <Modal.Footer>
				            <button className='job-text yellow-button btn' onClick={this.handleCloseTwo}>Close</button>
				          </Modal.Footer>
				        </Modal>
					</div>
				</div>
			</div>
		);
	}
}


export default JobSeeker;