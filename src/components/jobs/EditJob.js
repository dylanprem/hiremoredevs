import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withRouter } from 'react-router-dom';




class EditJob extends Component{
	constructor(props){
		super(props);
		this.state = {
			companyName: '',
		    email: '',
		    position: '',
		    jobState:'',
		    zip:'',
		    about: '',
		    phone:'',
		    applyLink:'',
		    reqOne:'',
			reqTwo:'',
			reqThree:'',
			jobDuty1:'',
		    jobDuty2:'',
		    jobDuty3:'',
		    jobDuty4:'',
		    jobDuty5:'',
		    jobDuty6:'',
		    jobDuty7:'',
		    jobDuty8:'',
		    jobDuty9:'',
		    jobDuty10:'',
			uid:'',
			JobPosts:[],
			currentJob: props.match.params.viewJob,
	    	authUser:null,
	    	isOwnPost: false
		}
		this.updateJob = this.updateJob.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	  }

	updateJob(e) {
	  const jobRef = firebase.database().ref('JobPosts/' + this.state.currentJob);
	  const JobPosts = {
	    companyName: this.companyName.value,
	    email: this.email.value,
	    position: this.position.value,
	    about: this.about.value,
	    jobState: this.state.jobState,
	    zip: this.zip.value,
	    phone: this.phone.value,
	    applyLink: this.applyLink.value,
	    reqOne:this.reqOne.value,
		reqTwo:this.reqTwo.value,
		reqThree:this.reqThree.value,
		jobDuty1: this.jobDuty1.value,
	    jobDuty2: this.jobDuty2.value,
	    jobDuty3:this.jobDuty3.value,
	    jobDuty4: this.jobDuty4.value,
	    jobDuty5: this.jobDuty5.value,
	    jobDuty6:this.jobDuty6.value,
	    jobDuty7:this.jobDuty7.value,
	    jobDuty8:this.jobDuty8.value,
	    jobDuty9:this.jobDuty9.value,
	    jobDuty10:this.jobDuty10.value,
	  }


	  jobRef.update(JobPosts);
	  this.setState({
		companyName: '',
	    email: '',
	    position: '',
	    jobState:'',
	    zip:'',
	    about: '',
	    phone:'',
	    applyLink:'',
	    reqOne:'',
		reqTwo:'',
		reqThree:'',
		jobDuty1:'',
	    jobDuty2:'',
	    jobDuty3:'',
	    jobDuty4:'',
	    jobDuty5:'',
	    jobDuty6:'',
	    jobDuty7:'',
	    jobDuty8:'',
	    jobDuty9:'',
	    jobDuty10:'',
	  });

	  this.props.history.push(`/job/${this.state.currentJob}`);  
	}



	componentDidMount() {

	  const JobPostsRef = firebase.database().ref('JobPosts/' + this.state.currentJob);
	  JobPostsRef.once('value', (snapshot) => {
	    let newState = [];
	      newState.push({
	        companyName: snapshot.val().companyName,
	        email: snapshot.val().email,
	        phone: snapshot.val().phone,
	        position: snapshot.val().position,
	        jobState: snapshot.val().jobState,
	        zip: snapshot.val().zip,
	        about: snapshot.val().about,
	        reqOne:snapshot.val().reqOne,
	        reqTwo: snapshot.val().reqTwo,
	        reqThree: snapshot.val().reqThree,
	        applyLink: snapshot.val().applyLink,
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
	      });
	    
	    this.setState({
	      JobPosts: newState
	    });
	  });

	
	

	firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
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
					<div>
					{this.state.isOwnPost ?
						<div className='col-md-6 col-md-offset-3 col-sm-6 col-xs-12 dark-bg-company-info company-info job-text'>
							{this.state.JobPosts.map((p) => {
						    		return(
				                    <div className="success text-center" key={p.id}>
								       <h3>Company: </h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='companyName' ref={(companyName) => this.companyName = companyName} defaultValue={p.companyName} />
								       
								       <h3>Email:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='email' ref={(email) => this.email = email} defaultValue={p.email} />

								       <h3>Phone:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='phone' ref={(phone) => this.phone = phone} defaultValue={p.phone} />

								       <h3>Position</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='position' ref={(position) => this.position = position} defaultValue={p.position} />

								       <h3>Job Location</h3>

								       <h4 className='text-left'>State</h4>
								     
								       <div className='form-group'>
										<select className='form-control' onChange={this.handleChange}  name='jobState' value={this.state.jobState} >
											<option value="" disabled>Select an option</option>
											<option value="Alabama">Alabama</option>
											<option value="Alaska">Alaska</option>
											<option value="Arizona">Arizona</option>
											<option value="Arkansas">Arkansas</option>
											<option value="California">California</option>
											<option value="Colorado">Colorado</option>
											<option value="Connecticut">Connecticut</option>
											<option value="Delaware">Delaware</option>
											<option value="District Of Columbia">District Of Columbia</option>
											<option value="Florida">Florida</option>
											<option value="Georgia">Georgia</option>
											<option value="Hawaii">Hawaii</option>
											<option value="Idaho">Idaho</option>
											<option value="Illinois">Illinois</option>
											<option value="Indiana">Indiana</option>
											<option value="Iowa">Iowa</option>
											<option value="Kansas">Kansas</option>
											<option value="Kentucky">Kentucky</option>
											<option value="Louisiana">Louisiana</option>
											<option value="Maine">Maine</option>
											<option value="Maryland">Maryland</option>
											<option value="Massachusetts">Massachusetts</option>
											<option value="Michigan">Michigan</option>
											<option value="Minnesota">Minnesota</option>
											<option value="Mississippi">Mississippi</option>
											<option value="Missouri">Missouri</option>
											<option value="Montana">Montana</option>
											<option value="Nebraska">Nebraska</option>
											<option value="Nevada">Nevada</option>
											<option value="New Hampshire">New Hampshire</option>
											<option value="New Jersey">New Jersey</option>
											<option value="New Mexico">New Mexico</option>
											<option value="New York">New York</option>
											<option value="North Carolina">North Carolina</option>
											<option value="North Dakota">North Dakota</option>
											<option value="Ohio">Ohio</option>
											<option value="Oklahoma">Oklahoma</option>
											<option value="Oregon">Oregon</option>
											<option value="Pennsylvania">Pennsylvania</option>
											<option value="Rhode Island">Rhode Island</option>
											<option value="South Carolina">South Carolina</option>
											<option value="South Dakota">South Dakota</option>
											<option value="Tennessee">Tennessee</option>
											<option value="Texas">Texas</option>
											<option value="Utah">Utah</option>
											<option value="Vermont">Vermont</option>
											<option value="Virginia">Virginia</option>
											<option value="Washington">Washington</option>
											<option value="West Virginia">West Virginia</option>
											<option value="Wisconsin">Wisconsin</option>
											<option value="Wyoming">Wyoming</option>
										</select>
									   </div>

								       <h4 className='text-left'>Zip</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='zip' ref={(zip) => this.zip = zip} defaultValue={p.zip} />

								       <h3>About the Job:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' ref={(about) => this.about = about} defaultValue={p.about} />

								       <h3>Requirements</h3>

								       <h4 className='text-left'>Req One</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqOne' ref={(reqOne) => this.reqOne = reqOne} defaultValue={p.reqOne} />

								       <h4 className='text-left'>Req Two</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqTwo' ref={(reqTwo) => this.reqTwo = reqTwo} defaultValue={p.reqTwo} />

								       <h4 className='text-left'>Req Three</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqThree' ref={(reqThree) => this.reqThree = reqThree} defaultValue={p.reqThree} />

								       <h3>Application Link</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='applyLink' ref={(applyLink) => this.applyLink = applyLink} defaultValue={p.applyLink} />

								  
								   

								       <h3>Job Duties</h3>
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty1' ref={(jobDuty1) => this.jobDuty1 = jobDuty1} defaultValue={p.jobDuty1} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty2' ref={(jobDuty2) => this.jobDuty2 = jobDuty2} defaultValue={p.jobDuty2} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty3' ref={(jobDuty3) => this.jobDuty3 = jobDuty3} defaultValue={p.jobDuty3} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty4' ref={(jobDuty4) => this.jobDuty4 = jobDuty4} defaultValue={p.jobDuty4} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty5' ref={(jobDuty5) => this.jobDuty5 = jobDuty5} defaultValue={p.jobDuty5} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty6' ref={(jobDuty6) => this.jobDuty6 = jobDuty6} defaultValue={p.jobDuty6} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty7' ref={(jobDuty7) => this.jobDuty7 = jobDuty7} defaultValue={p.jobDuty7} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty8' ref={(jobDuty8) => this.jobDuty8 = jobDuty8} defaultValue={p.jobDuty8} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty9' ref={(jobDuty9) => this.jobDuty9 = jobDuty9} defaultValue={p.jobDuty9} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty10' ref={(jobDuty10) => this.jobDuty10 = jobDuty10} defaultValue={p.jobDuty10} />
								       <br />

								       <button className ='btn btn-info job-text' onClick={this.updateJob}>Update Post</button>
							        </div>
							         );
				        		})}		        	       
						</div>
					: <div className='col-md-4 col-md-offset-4 text-center'><h1 className="job-text alert alert-danger">OOPS! YOU DO NOT HAVE ACCESS TO THIS PAGE.</h1></div> }
				</div>  	
				</div>
				:
				null
				}
			</div>
		);
	}
}


export default withRouter(EditJob);


