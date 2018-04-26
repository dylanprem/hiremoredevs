import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './collab.css';

class ViewCollab extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			currentCollab: this.props.match.params.currentCollab,
			Collabs:[],
			Comments:[],
			Profiles:[],
			commentBody:'',
			time:'',
			isEditing: false,
			editedcommentBody:'',
	}

	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.removeComment = this.removeComment.bind(this);

	
	}



	removeComment(commentId) {
	    const commentsRef = firebase.database().ref('Collabs/' + this.state.currentCollab + `/Comments/${commentId}`);
	    commentsRef.remove();
	    window.location.reload();
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	handleSubmit(e) {
	  e.preventDefault();
	  const collabsRef = firebase.database().ref('Collabs/' + this.state.currentCollab + '/Comments');
	  const Collabs = {
	  		uid: this.state.authUser.uid,
			commentBody: this.state.commentBody,
			time: new Date().toLocaleString()

	}

	collabsRef.push(Collabs);
	  this.setState({
			commentBody:'',
			time:'',
	  });
	window.location.reload();
}


	componentDidMount(){
		const collabsRef = firebase.database().ref('Collabs/' + this.state.currentCollab);
		collabsRef.once('value', (snapshot) => {
			let Collabs = snapshot.val();
			let newState = [];			
			newState.push({
				id: this.state.currentCollab,
				title: snapshot.val().title,
				description: snapshot.val().description,
				name: snapshot.val().name,
				time: snapshot.val().time,
				uid: snapshot.val().uid
			});
			
			this.setState({
				Collabs: newState
			});
		});

		const commentsRef = firebase.database().ref('Collabs/' + this.state.currentCollab + '/Comments');
		commentsRef.once('value', (snapshot) => {
			let Comments = snapshot.val();
			let newState = [];
			for (let comment in Comments){			
			newState.push({
				id: comment,
				uid: Comments[comment].uid,
				commentBody: Comments[comment].commentBody,
				time: Comments[comment].time,
			});
			}
			this.setState({
				Comments: newState
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
		        profilePicture: Profiles[profile].profilePicture
		       });
		    }
		    this.setState({
		      Profiles: newState
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
				<div className='col-md-12'>
					{this.state.Collabs.map((collab) => {
						return(
						<div key={collab.id}>
							{this.state.Profiles.map((profile) => {
		                      	return(
		                      		<div key={profile.id}>
		                      		{collab.uid === profile.uid ?
		                      		<div className='job-text text-center'>
		                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}><img src={profile.profilePicture} className='center-block img-responsive img-circle' style={{with:80, height:80}} /></Link>
		                      		<p><small className='text-muted'>From:</small> {profile.name}</p>
		                      		</div>
		                      		:
		                      		null
		                      		
		                      		}
		                      		</div>
		                      	);
		                      })}
							<h1 className='text-center'>Idea:</h1>
							<h1 className='job-text text-center'>{collab.title}</h1>
							<h1 className='text-center'>Description:</h1>
							<h3 className='text-center job-text'>{collab.description}</h3>
						</div>
						);
					})}
				</div>
				<div className='col-md-4 col-md-offset-4 profile-container'>
					<label className='job-text'>Leave a comment</label>
					<textarea className='form-control job-text' name='commentBody' value={this.state.commentBody} onChange={this.handleChange} rows='5' placeholder='I love this idea! Let&apos;s collab!' />
					<br />
					<div className='text-center'>
						<button className='btn yellow-button job-text' onClick={this.handleSubmit}>Submit</button>
					</div>
				</div>
				<div className='row text-center'>
					<div>
						{this.state.Comments.map((comment) => {
						return(
						<div key={comment.id} className='col-md-12'>
							<table className='table'>
								<tbody>
									<tr>
										<td>
											<div className='col-md-4 job-text'>
												{this.state.Profiles.map((profile) => {
							                      	return(
							                      		<div key={profile.id} className='col-md-12'>
							                      		{comment.uid === profile.uid ?
							                      		<div>
							                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}><img src={profile.profilePicture} className='center-block img-responsive img-circle' style={{with:40, height:40}} /></Link>
							                      		<p><small className='text-muted'>From:</small> {profile.name}</p>
							                      		</div>
							                      		:
							                      		null
							                      		
							                      		}
							                      		</div>
							                      	);
							                      })}
												
												<p>{comment.time}</p>
											</div>
											<div className='col-md-4 text-center job-text'>
												<p className='comment'>{comment.commentBody}</p>
											</div>
											<div className='col-md-4 text-center'>
												<div className='col-md-2'>
												{comment.uid === this.state.authUser.uid ? 
													<button className='btn btn-danger job-text btn-block' onClick={() => this.removeComment(comment.id)}><span className='glyphicon glyphicon-trash'></span>  DELETE</button> 
													: 
													null
												}
												</div>
												<div className='col-md-2'>
												{comment.uid === this.state.authUser.uid ? 
													<Link to={"/edit-comment/" + this.state.currentCollab + '/' + `${comment.id}`} className='btn btn-warning job-text btn-block'><span className='glyphicon glyphicon-pencil'></span>  EDIT</Link> 
													: 
													null
												}
												</div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						);})}
					</div>
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default ViewCollab;