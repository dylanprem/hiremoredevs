import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import { auth,db } from '../../firebase';

const PostJob = (props, { authUser }) =>

<div>
	<PostJobForm />
</div>

class PostJobForm extends Component {
	constructor(props) {
    super(props);
    this.state = {
	    companyName: '',
	    email: '',
	    position: '',
	    state: '',
	    city: '',
	    about: '',
	    apply:'',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e) {
    this.setState({
    	[e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
  e.preventDefault();
  const JobSeekersRef = firebase.database().ref('JobSeekerPosts');
  const JobSeekerPosts = {
    companyName: this.state.companyName,
    email: this.state.email,
    position: this.state.position,
    state: this.state.state,
    city: this.state.city,
    about: this.state.about,
  }


  JobSeekersRef.push(JobSeekerPosts);
  this.setState({
    companyName: '',
    email: '',
    position: '',
    state: '',
    city: '',
    about: '',
    apply:''
  });

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
			<div className='col-md-6 col-md-offset-3'>
				<form onSubmit={this.handleSubmit}>
					<div className='form-group'>
						<label>Company</label>
						<input className='form-control' name='companyName' onChange={this.handleChange} value={this.state.companyName} />
					</div>
					<div className='form-group'>
						<label>Email Address</label>
						<input className='form-control' name='email' onChange={this.handleChange} value={this.state.email}/>
					</div>
					<div className='form-group'>
						<label>I am a:</label>
						<select required className='form-control' name='position' onChange={this.handleChange} value={this.state.position}>
							<option disabled selected>Select an option</option>
							<option>Front End Developer</option>
							<option>Back End Developer</option>
							<option>Full Stack Developer</option>
						</select>
					</div>
					<div className='form-group'>
						<label>I'm looking for a job in:</label>
						<p>State</p>
						<select required className='form-control' name='state' onChange={this.handleChange} value={this.state.state}>
							<option disabled selected>Select an option</option>
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
						<input className='form-control' name='city' onChange={this.handleChange} value={this.state.city}/>
					</div>

					<div className='form-group'>
						<label>Tell us about the position. Please be specific!</label>
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
		);
	}
}



PostJobSeeker.contextTypes = {
  authUser: PropTypes.object,

};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(PostJob);
