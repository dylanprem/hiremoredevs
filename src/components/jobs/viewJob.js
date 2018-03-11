import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import JobFeed from '../feeds/JobFeed';
import { Modal } from 'react-bootstrap';
import './style.css'



class ViewJob extends Component{
	constructor(props, context){
		super(props, context);
		this.state = {
			JobPosts: [],
			postsFromUsers:[],
			currentJob: props.match.params.viewJob,
			uid:'',
			pic:'',
	    	name:'',
	    	email:'',
		    position: '',
		    state: '',
		    city: '',
		    relocate: '',
		    about: '',
		    github:'',
	    	linkedin:'',
	    	show: false,
	    	authUser:null
		}
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	
	}
	  removeItem(postId) {
	    const postRef = firebase.database().ref('JobPosts' + '/' + this.state.currentJob + '/' + `/postsFromUsers/${postId}`);
	    postRef.remove();
	    window.location.reload();
	  }


	 handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	  }

	  handleSubmit(e) {
	  
	  const JobPostsCandidatesRef = firebase.database().ref('JobPosts' + '/' + this.state.currentJob + '/' + 'postsFromUsers');
	  
	  
	  const postsFromUsers = { 
	  	uid: this.state.authUser.uid,
	  	pic: this.state.authUser.photoURL,
	  	name: this.state.authUser.displayName,
	  	email: this.state.authUser.email,
	    position: this.state.position,
	    state: this.state.state,
	    city: this.state.city,
	    relocate: this.state.relocate,
	    about: this.state.about,
	    github: this.state.github,
	    linkedin: this.state.linkedin
	  }

	  JobPostsCandidatesRef.push(postsFromUsers);
	  this.setState({
	  	pic:'',
	  	displayName:'',
	  	email:'',
	    position: '',
	    state: '',
	    city: '',
	    relocate: '',
	    about: '',
	    github:'',
	    linkedin:''
	  });

	}

	componentDidMount() {

	  const JobPostsRef = firebase.database().ref('JobPosts' + '/' + this.state.currentJob);
	  JobPostsRef.once('value', (snapshot) => {
	    let JobPosts = snapshot.val();
	    let newState = [];
	    
	      newState.push({
	        id: this.state.currentJob,
	        companyName: snapshot.val().companyName,
	        email: snapshot.val().email,
	        phone: snapshot.val().phone,
	        position: snapshot.val().position,
	        address: snapshot.val().address,
	        about: snapshot.val().about,
	        applyLink: snapshot.val().applyLink
	      });
	    
	    this.setState({
	      JobPosts: newState
	    });
	  });

	const JobPostsCandidatesRef = firebase.database().ref('JobPosts' + '/' + this.state.currentJob + '/' + 'postsFromUsers');
	JobPostsCandidatesRef.once('value', (snapshot) => {
		let postsFromUsers = snapshot.val();
		let newState = [];
		for (let post in postsFromUsers) {
	      newState.push({
	        id: post,
	        pic:postsFromUsers[post].pic,
	        name: postsFromUsers[post].name,
		    email: postsFromUsers[post].email,
		    position: postsFromUsers[post].position,
		    state: postsFromUsers[post].state,
		    city: postsFromUsers[post].city,
		    relocate: postsFromUsers[post].relocate,
		    about: postsFromUsers[post].about,
		    github: postsFromUsers[post].github,
		    linkedin: postsFromUsers[post].linkedin,
		    authUser: postsFromUsers[post].authUser
	      });
	    }
		this.setState({
			postsFromUsers: newState
		});
	});


	firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } 
    });	 
	}


	render(){
		return(
			<div className='row'>
				{this.state.authUser ?
				<div>
				<div className='col-md-12 dark-bg-company-info company-info'>
					{this.state.JobPosts.map((post) => {
				    		return(
		                    <div className="success text-center" key={post.id}>
						       <h3>Company: </h3>
						       <p className='job-text'>{post.companyName}</p>
						       
						       <h3>Email:</h3>
						       <p className='job-text'>{post.email}</p>

						       <h3>Phone:</h3>
						       <p className='job-text'>{post.phone}</p>

						       <h3>Position</h3>
						       <p className='job-text'>{post.position}</p>

						       <h3>Job Location</h3>
						       <p className='job-text'>{post.address}</p>

						       <h3>About the Job:</h3>
						       <p className='job-text'>{post.about}</p>
						       <Link target='_new' className='btn yellow-button' to={`${post.applyLink}`}>Apply</Link>
					        </div>

					         );
		        		})}
		        	       
				</div>
				<div className='col-md-12 post-box'>
					<h3 className='text-center'>Interested in this job? Tell us about yourself.</h3>
					<form className='col-md-4 col-md-offset-4' onSubmit={this.handleSubmit}>
						<div className='form-group'>
							<label>I am a:</label>
							<select required className='form-control' name='position' onChange={this.handleChange} value={this.state.position}>
								<option value="" disabled selected>Select an option</option>
								<option value="Front End Developer">Front End Developer</option>
								<option value="Back End Developer">Back End Developer</option>
								<option value="Full Stack Developer">Full Stack Developer</option>
							</select>
						</div>
						<div className='form-group'>
							<label>I'm located in:</label>
							<p>State</p>
							<select required className='form-control' name='state' onChange={this.handleChange} value={this.state.state}>
								<option value="" disabled selected>Select an option</option>
								<option value="AL">Alabama</option>
								<option value="AK">Alaska</option>
								<option value="AZ">Arizona</option>
								<option value="AR">Arkansas</option>
								<option value="CA">California</option>
								<option value="CO">Colorado</option>
								<option value="CT">Connecticut</option>
								<option value="DE">Delaware</option>
								<option value="DC">District Of Columbia</option>
								<option value="FL">Florida</option>
								<option value="GA">Georgia</option>
								<option value="HI">Hawaii</option>
								<option value="ID">Idaho</option>
								<option value="IL">Illinois</option>
								<option value="IN">Indiana</option>
								<option value="IA">Iowa</option>
								<option value="KS">Kansas</option>
								<option value="KY">Kentucky</option>
								<option value="LA">Louisiana</option>
								<option value="ME">Maine</option>
								<option value="MD">Maryland</option>
								<option value="MA">Massachusetts</option>
								<option value="MI">Michigan</option>
								<option value="MN">Minnesota</option>
								<option value="MS">Mississippi</option>
								<option value="MO">Missouri</option>
								<option value="MT">Montana</option>
								<option value="NE">Nebraska</option>
								<option value="NV">Nevada</option>
								<option value="NH">New Hampshire</option>
								<option value="NJ">New Jersey</option>
								<option value="NM">New Mexico</option>
								<option value="NY">New York</option>
								<option value="NC">North Carolina</option>
								<option value="ND">North Dakota</option>
								<option value="OH">Ohio</option>
								<option value="OK">Oklahoma</option>
								<option value="OR">Oregon</option>
								<option value="PA">Pennsylvania</option>
								<option value="RI">Rhode Island</option>
								<option value="SC">South Carolina</option>
								<option value="SD">South Dakota</option>
								<option value="TN">Tennessee</option>
								<option value="TX">Texas</option>
								<option value="UT">Utah</option>
								<option value="VT">Vermont</option>
								<option value="VA">Virginia</option>
								<option value="WA">Washington</option>
								<option value="WV">West Virginia</option>
								<option value="WI">Wisconsin</option>
								<option value="WY">Wyoming</option>
							</select>	
						</div>
						<div className='form-group'>
							<p>City</p>
							<input required className='form-control' name='city' onChange={this.handleChange} value={this.state.city}/>
						</div>
						<div className='form-group'>
							<label>Are you willing to relocate?</label>
							<select required className='form-control' name='relocate' onChange={this.handleChange} value={this.state.relocate}>
								<option value="" disabled selected>Select an option</option>
								<option value="Willing to relocate">Willing to relocate.</option>
								<option value="Not Willing to relocate">Does not want to relocate.</option>
							</select>
						</div>

						<div className='form-group'>
							<label>Tell us your strengths and weaknesses. Be sure to include specific technologies and frameworks.</label>
							<textarea onChange={this.handleChange} value={this.state.about} className='form-control' rows="5" name='about' placeholder='e.g. I love Javascript, but PHP? ...not so great. I am great with NOSQL datatbases like Firebase and MongoDB, but I am not a fan of MySQL.'></textarea>
						</div>

						<div className='form-group'>
						<div class="input-group">
						    <span class="input-group-addon">GitHub url</span>
						    <input id="msg" type="text" class="form-control" name="github" onChange={this.handleChange} value={this.state.github} placeholder="e.g. https://github.com/mygithub" />
						</div>

						<div class="input-group">
						    <span class="input-group-addon">LinkedIn url</span>
						    <input id="msg" type="text" class="form-control" name="linkedin" onChange={this.handleChange} value={this.state.linkedin} placeholder="e.g. https://linkedin.com/in/mylinkedin" />
						</div>
						</div>
						<input type='submit' className='btn btn-primary btn-block' value='Post' />
					</form>

				</div> 
				<div className='col-md-12 members-posted'>
					<h1 className='text-center'>Members interested in this job:</h1>
					<table className="table table-text">
						    <thead>
						      <tr>
						      	<th></th>
						      	<th>Name</th>
						        <th>Email</th>
						        <th>Position</th>
						        <th>Location</th>
						        <th>Details</th>
						        <th>GitHub</th>
						        <th>LinkedIn</th>
						        <th></th>
						      </tr>
						    </thead>
						    <tbody>
						    {this.state.postsFromUsers.map((post) => {
		    		  			return(
							    <tr className='active' key={post.id}>
							      <td><img style={{with:40, height:40}} className='img-responsive img-circle profile-pic center-block' src={post.pic} /></td>
			                      <td className='text-warning'>{post.name}</td>
			                      <td><strong className='text-primary'>{post.email}</strong></td>
			                      <td>{post.position}</td>
			                      <td>{post.city}, {post.state}</td>
			                      <td><button className='btn btn-info btn-sm'>View Details</button></td>
			                      <td><Link target='_new' className='btn btn-primary btn-sm' to={`${post.github}`}><small>GitHub</small></Link></td>
							      <td><Link target='_new' className='btn btn-primary btn-sm' to={`${post.linkedin}`}><small>LinkedIn</small></Link></td>
							      <td>{post.email === this.state.authUser.email ?
               						 <button type='submit' className="btn btn-danger btn-sm" onClick={() => this.removeItem(post.id)}>X</button> : null}
               					  </td>  
			                    </tr>
			                    
				                    );
			          			})}         
						    </tbody>
		            </table>		  	
		    		</div>  	
				</div>
				:
				<div className='text-center'>
					<h1>Please Login</h1>
				</div>
				}
			</div>
		);
	}
}


export default ViewJob;


