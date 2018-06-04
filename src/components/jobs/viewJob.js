import React, { Component } from 'react';
import * as firebase from 'firebase';
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import './style.css';



class ViewJob extends Component{
	constructor(props){
		super(props);
		this.state = {
			JobPosts: [],
			postsFromUsers:[],
			Profiles:[],
			AppliedJobs:[],
			RECRUITER:[],
			currentJob: props.match.params.viewJob,
			uid:'',
			pic:'',
	    	name:'',
	    	email:'',
		    position: '',
		    state: '',
		    zip:'',
		    city: '',
		    relocate: '',
		    about: '',
		    github:'',
	    	linkedin:'',
	    	isInterested: false,
	    	authUser: null,
	    	isOwnPost: false,
	    	postUID: '',
	    	recUID:'',
	    	isRecruiter:false

		}
		this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
    	
	}

	removeItem(id){
	 	const refToRemove = firebase.database().ref(`postsFromUsers/${id}`);
	 	refToRemove.remove();
	 	window.location.reload();
	 }


	 handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	  }

	  handleSubmit(e) {
		  const JobPostsCandidatesRef = firebase.database().ref('postsFromUsers');
		  const postsFromUsers = { 
		  	uid: this.state.authUser.uid,
		    position: this.state.position,
		    state: this.state.state,
		    city: this.state.city,
		    relocate: this.state.relocate,
		    jobID: this.state.currentJob
		  }

		  JobPostsCandidatesRef.push(postsFromUsers);
		  this.setState({
		    position: '',
		    state: '',
		    city: '',
		    relocate: '',
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
	        state: snapshot.val().state,
	        zip: snapshot.val().zip,
	        about: snapshot.val().about,
	        reqOne:snapshot.val().reqOne,
	        reqTwo: snapshot.val().reqTwo,
	        reqThree: snapshot.val().reqThree,
	        jobDuty1:snapshot.val().jobDuty1,
		    jobDuty2:snapshot.val().jobDuty2,
		    jobDuty3:snapshot.val().jobDuty3,
		    jobDuty4:snapshot.val().jobDuty4,
		    jobDuty5:snapshot.val().jobDuty5,
		    jobDuty6:snapshot.val().jobDuty6,
		    jobDuty7:snapshot.val().jobDuty7,
		    jobDuty8:snapshot.val().jobDuty8,
		    jobDuty9:snapshot.val().jobDuty9,
		    jobDuty10:snapshot.val().jobDuty10,
	        applyLink: snapshot.val().applyLink,
	        uid: snapshot.val().uid
	      });
	    
	    this.setState({
	      JobPosts: newState
	    });
	  });

	const JobPostsCandidatesRef = firebase.database().ref('postsFromUsers');
	JobPostsCandidatesRef.once('value', (snapshot) => {
		let postsFromUsers = snapshot.val();
		let newState = [];
		for (let post in postsFromUsers) {
	      newState.push({
	        id: post,
	        uid: postsFromUsers[post].uid,
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
		    jobID: postsFromUsers[post].jobID
	      });
	    }
		this.setState({
			postsFromUsers: newState
		});
	});

	
	const profilesRef = firebase.database().ref('Profiles' );
	profilesRef.once('value', (snapshot) => {
	    let Profiles = snapshot.val();
	    let newState = [];
	    for (let profile in Profiles){
	      newState.push({
	        id: profile,
	        uid: Profiles[profile].uid,
	        name: Profiles[profile].name,
	        profilePicture: Profiles[profile].profilePicture,
	        email: Profiles[profile].email
	       });
	    }
	    this.setState({
	      Profiles: newState
	    });
	  });

	const recRef = firebase.database().ref('RECRUITER');
	recRef.once('value', (snapshot) => {
	    let RECRUITER = snapshot.val();
	    let newState = [];
	    for (let r in RECRUITER){
	      newState.push({
	        id: r,
	        uid: RECRUITER[r].uid,
	        companyName: RECRUITER[r].companyName,
	        linkedin: RECRUITER[r].linkedin
	       });
	    }
	    this.setState({
	      RECRUITER: newState
	    });
	  });


	firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
        firebase.database().ref('postsFromUsers' ).orderByChild("jobID").equalTo(this.state.currentJob).once("value", (snapshot) => {
		    snapshot.forEach((childSnapshot) => {
		    	if (childSnapshot.child("uid").val() === this.state.authUser.uid){
		    		this.setState({isInterested: true});
		    	} else {
		    		this.setState({isInterested:false});
		    	}
		    });
		});

		firebase.database().ref('JobPosts/' + this.state.currentJob).once("value", (snapshot) => {
		    	if (snapshot.child("uid").val() === this.state.authUser.uid){
		    		this.setState({isOwnPost: true});
		    	} else {
		    		this.setState({isOwnPost:false});
		    	}
			});
	    }
	});

	}






	render(){

		return(
			<div className='row'>
				{this.state.authUser ?
				<div>
				<div className='col-md-6 col-md-offset-3 col-sm-10 col-sm-offset-1 col-xs-10 col-xs-offset-1 dark-bg-company-info company-info job-text'>
					{this.state.JobPosts.map((post) => {
				    		return(
		                    <div className="success text-center" key={post.id}>
		                    	{this.state.isOwnPost ? <Link className='btn yellow-button job-text' to={`/edit-job/${this.state.currentJob}`}><span className='glyphicon glyphicon-pencil'></span> Edit this Job Post</Link> : null }
		                       {this.state.Profiles.map((profile) =>{return(
									<div key={profile.id}>
									{this.state.RECRUITER.map((r) => {return(
										<div key={r.id}>
											<div>
												{profile.uid === r.uid && post.uid === r.uid  ?
												<div> 
												<h1>Posted by:</h1>
												<img style={{width:100, height:100}} className='img-responsive img-circle profile-pic center-block' src={profile.profilePicture} />
												<p className='job-text'>{profile.name}</p>
												<Link to={r.linkedin} className='btn btn-primary job-text' target="_blank">LinkedIn</Link>
												<p className='job-text'>Recruiter at: <span className='text-white'> {r.companyName}</span></p>
												</div>	
												: null}
											</div>
										</div>
									);})}
									</div>
								);})}
						       <h3>Company: </h3>
						       <p className='job-text'>{post.companyName}</p>
						       
						       <h3>Email:</h3>
						       <p className='job-text'>{post.email}</p>

						       <h3>Phone:</h3>
						       <p className='job-text'>{post.phone}</p>

						       <h3>Position</h3>
						       <p className='job-text'>{post.position}</p>

						       <h3>Job Location</h3>
						       <p className='job-text'>{post.state}</p>

						       <h3>About the Job:</h3>
						       <p className='job-text'>{post.about}</p>

						       <h3 className='text-left job-text'>Job Duties and Responsibilites:</h3>
						       <div className='col-md-12 col-sm-12 col-xs-12'>
							       <ul className='list-group text-left job-text'>
							       	  {post.jobDuty1 != '' ? <li>{post.jobDuty1}</li> : null}
							       	  {post.jobDuty2 != '' ? <li>{post.jobDuty2}</li> : null}
							       	  {post.jobDuty3 != '' ? <li>{post.jobDuty3}</li> : null}
							       	  {post.jobDuty4 != '' ? <li>{post.jobDuty4}</li> : null}
							       	  {post.jobDuty5 != '' ? <li>{post.jobDuty5}</li> : null}
							       	  {post.jobDuty6 != '' ? <li>{post.jobDuty6}</li> : null}
							       	  {post.jobDuty7 != '' ? <li>{post.jobDuty7}</li> : null}
							       	  {post.jobDuty8 != '' ? <li>{post.jobDuty8}</li> : null}
							       	  {post.jobDuty9 != '' ? <li>{post.jobDuty9}</li> : null}
							       	  {post.jobDuty10 != '' ? <li>{post.jobDuty10}</li> : null}		
							       </ul>
							   </div>

						       <h3>Requirements</h3>
						       <p className='job-text'>{post.reqOne}</p>
						       <p className='job-text'>{post.reqTwo}</p>
						       <p className='job-text'>{post.reqThree}</p>
						       <Link target='_new' className='btn yellow-button job-text' to={`${post.applyLink}`}>Apply</Link>
					        </div>

					         );
		        		})}
		        	       
				</div>
				{this.state.isOwnPost 
					? 
					<div className= 'row job-text text-white'>
						<div className='col-md-12 col-sm-12 col-xs-12'>
						<h1 className='text-center'>You posted this job.</h1>
						</div>
					</div> 
					:
					<div>
						{this.state.isInterested ?
						<div className='col-md-12 col-sm-12 col-xs-12 post-box' id="thanks-box">
							<h3 className='text-center'>You've already expressed interest in this job.</h3> 
						</div>
						:
						<div className='col-md-12 col-sm-12 col-xs-12 post-box' id="post-box">
							<h3 className='text-center'>Interested in this job? Tell us about yourself.</h3>
							<form className='col-md-4 col-md-offset-4 col-xs-12 col-sm-12 job-text' onSubmit={this.handleSubmit}>
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
								<input type='submit' className='btn black-button btn-block' value='Post' />
							</form>
						</div>
						}
					</div>
				}
				<div className='col-md-12'>
					<div className='col-md-12 col-sm-12 col-xs-12'>
					<h1 className='text-center job-text'>Members interested in this job:</h1>
						<div className='table-responsive'>
							<table className="table table-text col-md-12 col-sm-12 col-xs-12">
								    <thead>
								      <tr>
										<th></th>
								      	<th>Name</th>
								        <th>Email</th>
								        <th className='hidden-xs'>Position</th>
								        <th className='hidden-xs'>Location</th>
								        <th className='hidden-xs'>Status</th>
								        <th>Profile</th>
								        
								        
								        <th></th>
								      </tr>
								    </thead>
								    <tbody>
								    {this.state.postsFromUsers.map((post) => {
				    		  			return(
									    <tr className='active' key={post.id}>  
											<td>
											{this.state.Profiles.map((profile) => {
											return(
												<div key={profile.id} className='hidden-xs'>
												{post.uid === profile.uid && post.jobID === this.state.currentJob  ? 
												<img style={{width:40, height:40}} className='img-responsive img-circle profile-pic center-block' src={profile.profilePicture} />
												:
												null}
												</div>
												);
											})}
											</td>
											<td>
											{this.state.Profiles.map((profile) => {
											return(
												<div key={profile.id}>
												{post.uid === profile.uid && post.jobID === this.state.currentJob ? 
												<p>{profile.name}</p>
												:
												null}
												</div>
												);
											})}
											</td>
											<td>
											{this.state.Profiles.map((profile) => {
											return(
												<div key={profile.id}>
												{post.uid === profile.uid && post.jobID === this.state.currentJob ? 
												<strong className='text-primary'>{profile.email}</strong>
												:
												null}
												</div>
												);
											})}
											</td>
											<td className='hidden-xs'>{post.jobID === this.state.currentJob ? <p>{post.position}</p> : null}</td>
											<td className='hidden-xs'>{post.jobID === this.state.currentJob ? <p>{post.city}, {post.state}</p> : null}</td>
											<td className='hidden-xs'>{post.jobID === this.state.currentJob ? <p>{post.relocate}</p> : null}</td>
											<td>
					                      {this.state.Profiles.map((profile) => {
					                      	return(
					                      		<div key={profile.id}>
					                      		{post.uid === profile.uid && post.jobID === this.state.currentJob ?
					                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}>View</Link>
					                      		:
					                      		null
					                      		
					                      		}
					                      		</div>
					                      	);
					                      })}
					                      </td>
									      <td>{post.uid === this.state.authUser.uid && post.jobID === this.state.currentJob ?
		               						 <button type='submit' className="btn btn-danger btn-sm hidden-xs" onClick={() => this.removeItem(post.id)}><span className='glyphicon glyphicon-trash'></span> DELETE&nbsp;</button> : null}
		               						 {post.uid === this.state.authUser.uid && post.jobID === this.state.currentJob ?
		               						 <button type='submit' className="btn btn-danger btn-sm visible-xs" onClick={() => this.removeItem(post.id)}><span className='glyphicon glyphicon-trash'></span></button> : null}
		               					  </td>
					                    </tr>
					                    
						                    );
					          			})}         
								    </tbody>
				            </table>
				        </div>
		            </div>		  	
		    	</div>  	
				</div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(ViewJob);


