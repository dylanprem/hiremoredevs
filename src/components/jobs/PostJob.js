import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import { auth,db } from '../../firebase';
import Phone from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';
import * as routes from '../../constants/routes';
import { BrowserRouter as BrowserHistory, Router, Route, Link } from 'react-router-dom';


class PostJobForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
	    companyName: '',
	    email: '',
	    position: '',
	   	state: '',
	   	zip:'',
	    about: '',
	    apply:'',
	    phone:'',
	    applyLink:'',
	    reqOne:'',
	    reqTwo:'',
	    reqThree:'',
	    authUser:null
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
  e.preventDefault();
  const JobsRef = firebase.database().ref('JobPosts');
  const JobPosts = {
    companyName: this.state.companyName,
    email: this.state.email,
    position: this.state.position,
    about: this.state.about,
    state: this.state.state,
    zip: this.state.zip,
    phone: this.state.phone,
    applyLink: this.state.applyLink,
    reqOne:this.state.reqOne,
	reqTwo:this.state.reqTwo,
	reqThree:this.state.reqThree,
  }


  JobsRef.push(JobPosts);
  this.setState({
    companyName: '',
    email: '',
    position: '',
    state:'',
    zip:'',
    about: '',
    phone:'',
    applyLink:'',
    reqOne:'',
	reqTwo:'',
	reqThree:'',
  });

this.props.history.push(routes.CURRENT_FEED);  
}

componentDidMount(){
      firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } 
    });
}
	render(){
		return(
			<div>
			{this.state.authUser ?
			<div className='row job-form'>
			<div className='col-md-6 col-md-offset-3'>
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
							<option disabled selected>Select an option</option>
							<option>Front End Developer</option>
							<option>Back End Developer</option>
							<option>Full Stack Developer</option>
						</select>
					</div>
					
					<div className='form-group'>
						<label>Job location</label>
						<select className='form-control' name='state' onChange={this.handleChange} value={this.state.state} >
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
						<input required type='text' className='form-control' name='zip' onChange={this.handleChange} value={this.state.zip} />
					</div>

					<div className='form-group'>
						<label>Tell us about the position. Please be specific!</label>
						<textarea onChange={this.handleChange} value={this.state.about} className='form-control' rows="5" name='about' placeholder='We are looking for MERN Stack developer!'></textarea>
					</div>

					<div className='form-group'>
						<label>Online Application Link</label>
						<div class="input-group">
						    <span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span>
						    <input required type='text' className='form-control' name='applyLink' value={this.state.applyLink} onChange={this.handleChange} placeholder='Add the direct link to your application or website' />
							
						</div>
						<small className='text-danger'>* URL must include https://</small>	
					</div>
					<div className='form-group'>
						<label>Top 3 Job Requirements</label>
						<input placeholder='React JS' className='form-control' name='reqOne' onChange={this.handleChange} value={this.state.reqOne}/>
						<input placeholder='Java' className='form-control' name='reqTwo' onChange={this.handleChange} value={this.state.reqTwo}/>
						<input placeholder='Bootstrap' className='form-control' name='reqThree' onChange={this.handleChange} value={this.state.reqThree}/>
					</div>

					<button className='btn yellow-button btn-block' type='submit'>Post</button>
				</form>
			</div>
			</div>
			:
			<p>Please Login</p>
			}
			</div>
		);
	}
}


export default PostJobForm;
