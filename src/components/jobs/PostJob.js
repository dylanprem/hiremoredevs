import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withAuthorization from '../withAuthorization';
import * as firebase from 'firebase';
import { auth,db } from '../../firebase';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Phone from 'react-phone-number-input';
import rrui from 'react-phone-number-input/rrui.css';
import rpni from 'react-phone-number-input/style.css';

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
	   	address: '',
	    about: '',
	    apply:'',
	    phone:'',
	    applyLink:'',
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
    address: this.state.address,
    phone: this.state.phone,
    applyLink: this.state.applyLink
  }


  JobsRef.push(JobPosts);
  this.setState({
    companyName: '',
    email: '',
    position: '',
    address:'',
    about: '',
    phone:'',
    applyLink:''
  });

  geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error))

}

componentDidMount(){
      firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        this.setState({ authUser });
      } 
    });
}
	render(){
		const inputProps = {
	      value: this.state.address,
	      onChange: this.onChange,
	    }

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
						<PlacesAutocomplete inputProps={inputProps} className='form-control' value={this.state.address} />
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
					

					<input type='submit' className='btn btn-primary btn-block' value='Post' />
				</form>
			</div>
		);
	}
}



PostJob.contextTypes = {
  authUser: PropTypes.object,

};

const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(PostJob);
