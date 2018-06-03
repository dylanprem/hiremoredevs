import React, { Component } from 'react';
import './landing.css';
import {Modal} from 'react-bootstrap';
import CollabSteps from './CollabSteps';

class CollabBlock extends Component {
	constructor(props){
		super(props);
		this.state = {

		}
		this.handleShow = this.handleShow.bind(this);
    	this.handleClose = this.handleClose.bind(this);
	}
	handleClose() {
    	this.setState({ show: false });
  	}

  	handleShow() {
    	this.setState({ show: true });
  	}
	render(){
		return(
			<div className='row collab-img' >
				<div className='col-md-12 opacity'>
					<div className='col-md-12 inner text-center'>
						<h1 className='text-center'>Collaborators</h1>
						<button className='job-text btn yellow-button' onClick={this.handleShow}>Learn More</button>
					</div>
					<Modal show={this.state.show} onHide={this.handleClose}>
			          <Modal.Header closeButton>
			            <Modal.Title className='job-text text-center'>Collab Corner Features</Modal.Title>
			          </Modal.Header>
			          <Modal.Body>
			            <CollabSteps />
			          </Modal.Body>
			          <Modal.Footer>
			            <button className='job-text yellow-button btn' onClick={this.handleClose}>Close</button>
			          </Modal.Footer>
			        </Modal>
				</div>
			</div>
		);
	}
}


export default CollabBlock;