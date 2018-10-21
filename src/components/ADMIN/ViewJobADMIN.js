import React, { Component } from 'react';
import * as firebase from 'firebase';
import * as routes from '../../constants/routes';
import { withRouter } from 'react-router-dom';





class ViewJobADMIN extends Component{
	constructor(props, context){
		super(props, context);
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
			JobPostRequests: [],
			JobPosts:[],
			ADMIN:[],
			currentJobADMIN: props.match.params.viewJobADMIN,
	    	authUser:null,
	    	isAdmin: false,
	    	uid:''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	  }

	handleSubmit(e) {
	  e.preventDefault();
	  const JobPostToDelete = firebase.database().ref('JobPostRequests/' + this.state.currentJobADMIN);
	  const JobsRef = firebase.database().ref('JobPosts');
	  const JobPosts = {
	    companyName: this.companyName.value,
	    email: this.email.value,
	    position: this.position.value,
	    about: this.about.value,
	    jobState: this.jobState.value,
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
	    uid: this.uid.value
		
	  }


	  JobsRef.push(JobPosts);
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
	    uid:''
		
	  });
	  JobPostToDelete.remove();		
	  this.props.history.push(routes.ADMIN_APPROVE_JOB);  
	}



	componentDidMount() {
	  firebase.database().ref('JobPostRequests/' + this.state.currentJobADMIN).once('value', (snapshot) => {
	    let newState = [];
	      newState.push({
	        id: this.state.currentJobADMIN,
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
		    uid: snapshot.val().uid
	      });
	    
	    this.setState({
	      JobPostRequests: newState
	    });
	  });

	
	

	firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
        firebase.database().ref("ADMIN").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
			    const userDataAlt = snapshot.val();
			    if (userDataAlt) {
					this.setState({isAdmin:true});
			    } else {
			    	this.setState({isAdmin:false});
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
					{this.state.isAdmin ?
						<div className='col-md-6 col-md-offset-3 col-sm-6 col-xs-12 dark-bg-company-info company-info job-text'>
							{this.state.JobPostRequests.map((post) => {
						    		return(
				                    <div className="success text-center" key={post.id}>
								       <h3>Company: </h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='companyName' ref={(companyName) => this.companyName = companyName} defaultValue={post.companyName} />
								       
								       <h3>Email:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='email' ref={(email) => this.email = email} defaultValue={post.email} />

								       <h3>Phone:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='phone' ref={(phone) => this.phone = phone} defaultValue={post.phone} />

								       <h3>Position</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='position' ref={(position) => this.position = position} defaultValue={post.position} />

								       <h3>Job Location</h3>

								       <h4 className='text-left'>State</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='jobState' ref={(jobState) => this.jobState = jobState} defaultValue={post.jobState} />

								       <h4 className='text-left'>Zip</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='zip' ref={(zip) => this.zip = zip} defaultValue={post.zip} />

								       <h3>About the Job:</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' ref={(about) => this.about = about} defaultValue={post.about} />

								       <h3>Requirements</h3>

								       <h4 className='text-left'>Req One</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqOne' ref={(reqOne) => this.reqOne = reqOne} defaultValue={post.reqOne} />

								       <h4 className='text-left'>Req Two</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqTwo' ref={(reqTwo) => this.reqTwo = reqTwo} defaultValue={post.reqTwo} />

								       <h4 className='text-left'>Req Three</h4>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='reqThree' ref={(reqThree) => this.reqThree = reqThree} defaultValue={post.reqThree} />

								       <h3>Application Link</h3>
								       <input type='text' onChange={this.handleChange} className='job-text form-control' name='applyLink' ref={(applyLink) => this.applyLink = applyLink} defaultValue={post.applyLink} />

								       

								       <h3>Job Duties</h3>
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty1' ref={(jobDuty1) => this.jobDuty1 = jobDuty1} defaultValue={post.jobDuty1} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty2' ref={(jobDuty2) => this.jobDuty2 = jobDuty2} defaultValue={post.jobDuty2} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty3' ref={(jobDuty3) => this.jobDuty3 = jobDuty3} defaultValue={post.jobDuty3} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty4' ref={(jobDuty4) => this.jobDuty4 = jobDuty4} defaultValue={post.jobDuty4} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty5' ref={(jobDuty5) => this.jobDuty5 = jobDuty5} defaultValue={post.jobDuty5} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty6' ref={(jobDuty6) => this.jobDuty6 = jobDuty6} defaultValue={post.jobDuty6} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty7' ref={(jobDuty7) => this.jobDuty7 = jobDuty7} defaultValue={post.jobDuty7} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty8' ref={(jobDuty8) => this.jobDuty8 = jobDuty8} defaultValue={post.jobDuty8} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty9' ref={(jobDuty9) => this.jobDuty9 = jobDuty9} defaultValue={post.jobDuty9} />
								       <br />
								       <textarea type='text' onChange={this.handleChange} className='job-text form-control' name='jobDuty10' ref={(jobDuty10) => this.jobDuty10 = jobDuty10} defaultValue={post.jobDuty10} />
								       <br />
								       <input onChange={this.handleChange} className='job-text form-control' id="disabledInput" disabled name='uid' ref={(uid) => this.uid = uid} defaultValue={post.uid} />
								       <button onClick={this.handleSubmit} className='btn btn-info'>Approve</button>
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


export default withRouter(ViewJobADMIN);


