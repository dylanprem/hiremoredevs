import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import { auth,db } from '../../firebase';
import Phone from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as BrowserHistory, Router, Route, Link } from 'react-router-dom';
import SignInForm from '../Auth/login';


class PostJobForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
	    companyName: '',
	    email: '',
	    position: '',
	   	jobState: '',
	   	zip:'',
	    about: '',
	    apply:'',
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
	    authUser:null,
	    RECRUITER:[],
	    isRecruiter: false,
	    hasJobPending: false,
	    invalid: false,
	    
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = (address) => this.setState({ address });
  }



  handleChange(e) {
    this.setState({
    	[e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
	  const JobsRef = firebase.database().ref('JobPostRequests');
	  const JobPostRequests = {
	    companyName: this.state.companyName,
	    email: this.state.email,
	    position: this.state.position,
	    about: this.state.about,
	    jobState: this.state.jobState,
	    zip: this.state.zip,
	    phone: this.state.phone,
	    applyLink: this.state.applyLink,
	    reqOne:this.state.reqOne,
		reqTwo:this.state.reqTwo,
		reqThree:this.state.reqThree,
		uid: this.state.authUser.uid,
		jobDuty1:this.state.jobDuty1,
	    jobDuty2:this.state.jobDuty2,
	    jobDuty3:this.state.jobDuty3,
	    jobDuty4:this.state.jobDuty4,
	    jobDuty5:this.state.jobDuty5,
	    jobDuty6:this.state.jobDuty6,
	    jobDuty7:this.state.jobDuty7,
	    jobDuty8:this.state.jobDuty8,
	    jobDuty9:this.state.jobDuty9,
	    jobDuty10:this.state.jobDuty10,
	  }
	  JobsRef.push(JobPostRequests);
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
this.props.history.push(routes.THANK_YOU);  
}

componentDidMount(){
    const recruiterRef = firebase.database().ref('RECRUITER');
        recruiterRef.once('value', (snapshot) => {		
		    let RECRUITER = snapshot.val();
		    let newState = [];
		    for (let r in RECRUITER){
		      newState.push({
		        id: r,
				uid:RECRUITER[r].uid,
		      });

		    }
		    this.setState({
		      RECRUITER: newState
		    });
		    if(RECRUITER){
		    	this.setState({isRecruiter:true});
		    } else {
		    	this.setState({isRecruiter:false});
		    }
		  });

      firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
        firebase.database().ref('JobPostRequests').orderByChild("uid").equalTo(this.state.authUser.uid).once("value", (snapshot) =>{
        	const data = snapshot.val();
        	if (data) {
        		this.setState({hasJobPending: true});
        	} else {
        		this.setState({hasJobPending: false});
        	}
        });
      } 
    });
}
	render(){
		return(
			<div>
			{this.state.authUser ?
			<div>
			{this.state.hasJobPending ? 
				<div><h1 className='text-center job-text'>You currently have one job post pending. Please wait until it is approved to post another.</h1></div> 
			:
				<div className='row job-form'>
					{this.state.isRecruiter ?
					<div className='col-md-6 col-md-offset-3 col-sm-12 col-xs-12'>
						<div className='col-md-12'>
							<div>
							<h1 className='text-center'>Please fill out this form to post this Job</h1>
							<form className='job-text' onSubmit={this.handleSubmit}>
								<div className='form-group'>
									<label>Company</label>
									<input className='form-control' name='companyName' onChange={this.handleChange} value={this.state.companyName} />
								</div>
								<div className='form-group'>
									<label>Email Address</label>
									<input className='form-control' name='email' onChange={this.handleChange} value={this.state.email}/>
								</div>
								<div className='form-group'>
									<label>Phone Number</label>
									 <Phone className='form-control' placeholder="Enter phone number" value={ this.state.primaryPhone } onChange={ phone => this.setState({ phone }) } />
								</div>
								<div className='form-group'>
									<label>We are looking for a:</label>
									<select required className='form-control' name='position' onChange={this.handleChange} value={this.state.position}>
										<option value="" disabled selected>Select an option</option>
										<option value="Front End Developer">Front End Developer</option>
										<option value="Back End Developer">Back End Developer</option>
										<option value="Full Stack Developer">Full Stack Developer</option>
									</select>
								</div>
								
								<div className='form-group'>
									<label>Job location</label>
									<select className='form-control' name='jobState' onChange={this.handleChange} value={this.state.jobState} >
										<option value="" disabled selected>Select an option</option>
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

								<div className='form-group'>
									<label>Zip Code</label>
									<input required type='text' className='form-control' name='zip' onChange={this.handleChange} value={this.state.zip} maxlength="5" />
								</div>

								<div className='form-group'>
									<label>Tell us about the position.</label>
									<textarea onChange={this.handleChange} value={this.state.about} className='form-control' rows="5" name='about' placeholder='We are looking for MERN Stack developer!'></textarea>
								</div>

								<div className='form-group'>
									<label>Online Application Link</label>
									<div class="input-group">
									    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
									    <input id="applyLink" required type='text' className='form-control' name='applyLink' value={this.state.applyLink} onChange={this.handleChange} placeholder='Add the direct link to your application or website' />
										
									</div>
									{this.state.invalid ? <small className='text-danger'>* URL must include https://</small> : null }	
								</div>
								<div className='form-group'>
									<label>Top 3 Required Skills and Qualifications</label>
									<input placeholder='React JS' className='form-control' name='reqOne' onChange={this.handleChange} value={this.state.reqOne}/>
									<br/>
									<input placeholder='Java' className='form-control' name='reqTwo' onChange={this.handleChange} value={this.state.reqTwo}/>
									<br/>
									<input placeholder='Bootstrap' className='form-control' name='reqThree' onChange={this.handleChange} value={this.state.reqThree}/>
								</div>
								<div className='form-group'>
									<label>Job Duties</label>
									<input placeholder="e.g. Defines site objectives by analyzing user requirements; envisioning system features and functionality." className='form-control' name='jobDuty1' onChange={this.handleChange} value={this.state.jobDuty1}/>
									<br />
									<input placeholder="e.g. Designs and develops user interfaces to Internet/intranet applications by setting expectations and features priorities throughout development life cycle" className='form-control' name='jobDuty2' onChange={this.handleChange} value={this.state.jobDuty2}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty3' onChange={this.handleChange} value={this.state.jobDuty3}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty4' onChange={this.handleChange} value={this.state.jobDuty4}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty5' onChange={this.handleChange} value={this.state.jobDuty5}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty6' onChange={this.handleChange} value={this.state.jobDuty6}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty7' onChange={this.handleChange} value={this.state.jobDuty7}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty8' onChange={this.handleChange} value={this.state.jobDuty8}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty9' onChange={this.handleChange} value={this.state.jobDuty9}/>
									<br />
									<input placeholder="Job Duty" className='form-control' name='jobDuty10' onChange={this.handleChange} value={this.state.jobDuty10}/>
									<br />
								</div>

								<button className='btn yellow-button btn-block' type='submit'>Post</button>
								{this.state.invalid ? <p className='text-danger'>There were some errors with some of the info you've provided. Please check again.</p> : null }
							</form>
							</div>
						</div>
					</div>
					: 
					<div>
					<h1 className='text-center job-text'>ONLY REGISTERED RECRUITERS CAN POST JOBS. PLEASE CLICK ON THE RECRUITER REGISTRATION BUTTON TO REGISTER YOUR ACCOUNT AS A RECRUITER</h1> 
					</div>}
				</div>
			}
			</div>
			:
			null
			}
			</div>
		);
	}
}


export default PostJobForm;
