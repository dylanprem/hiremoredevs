import React, {Component} from 'react';
import * as firebase from 'firebase';
import {withRouter, Link } from 'react-router-dom';
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
			hasComments: false
	}

	this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	this.removeComment = this.removeComment.bind(this);

	
	}



	removeComment(commentId) {
	    const commentsRef = firebase.database().ref(`Comments/${commentId}`);
	    commentsRef.remove();
	    window.location.reload();
	}

	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}

	handleSubmit(e) {
	  const commentsRef = firebase.database().ref('Comments');
	  const Comments = {
	  		uid: this.state.authUser.uid,
			commentBody: this.state.commentBody,
			time: new Date().toLocaleString(),
			collabId: this.state.currentCollab
	}
	commentsRef.push(Comments);
	    this.setState({
			commentBody:'',
			time:'',
	    });
	window.location.reload();
}


	componentDidMount(){
		const collabsRef = firebase.database().ref('Collabs/' + this.state.currentCollab);
		collabsRef.once('value', (snapshot) => {
			let newState = [];			
			newState.push({
				id: this.state.currentCollab,
				title: snapshot.val().title,
				description: snapshot.val().description,
				name: snapshot.val().name,
				time: snapshot.val().time,
				uid: snapshot.val().uid,
				frameworkOne: snapshot.val().frameworkOne,
				frameworkTwo: snapshot.val().frameworkTwo,
				frameworkThree: snapshot.val().frameworkThree,
				lookingFor: snapshot.val().lookingFor,
			});
			
			this.setState({
				Collabs: newState
			});
		});

		const commentsRef = firebase.database().ref('Comments');
		commentsRef.once('value', (snapshot) => {
			let Comments = snapshot.val();
			let newState = [];
			for (let comment in Comments){			
			newState.push({
				id: comment,
				uid: Comments[comment].uid,
				commentBody: Comments[comment].commentBody,
				time: Comments[comment].time,
				collabId: Comments[comment].collabId
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
	        firebase.database().ref('Comments').orderByChild('collabId').equalTo(this.state.currentCollab).once('value', (snapshot) => {
	        	let commentData = snapshot.val();
	        	if (commentData) {
	        		this.setState({hasComments: true});
	        	} else {
	        		this.setState({hasComments:false});
	        	}
	        });
	      } 
    	});
	}

	render(){
		return(
			<div className='row job-text CollabRow'>
			{this.state.authUser ?
			<div>
				<div className='col-md-12'>
					<div className='col-md-3 col-sm-3 col-xs-12'>
					{this.state.Collabs.map((collab) => {
						return(
						<div key={collab.id}>
							{this.state.Profiles.map((profile) => {
		                      	return(
		                      		<div key={profile.id} className='col-md-12'>
		                      		{collab.uid === profile.uid ?
		                      		<div className='job-text text-center'>
		                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}><img src={profile.profilePicture} className='center-block img-responsive img-circle profile-pic' style={{width:80, height:80}} /></Link>
		                      		<p><small className='text-muted'>From:</small> {profile.name}</p>
		                      		</div>
		                      		:
		                      		null
		                      		
		                      		}
		                      		</div>
		                      	);
		                      })}
						</div>
						);
					})}
					</div>
					<div className='col-md-3 col-sm-3 col-xs-12'>
					{this.state.Collabs.map((collab) => {
						return(
						<div key={collab.id}>
							<h1 className='text-center'>Idea:</h1>
							<p className='job-text text-center'>{collab.title}</p>
							<h1 className='text-center'>Description:</h1>
							<div className='row'>
								<div className='col-md-12'><p className='text-center job-text description'>{collab.description}</p></div>
							</div>
						</div>
						);
					})}
					</div>
					<div className='col-md-3 col-sm-3 col-xs-12'>
					{this.state.Collabs.map((collab) => {
						return(
						<div key={collab.id}>
							<h1 className='text-center'>Frameworks:</h1>
							<p className='job-text text-center'>{collab.frameworkOne}</p>
							<p className='job-text text-center'>{collab.frameworkTwo}</p>
							<p className='job-text text-center'>{collab.frameworkThree}</p>
							
						</div>
						);
					})}
					</div>
					<div className='col-md-3 col-sm-3 col-xs-12'>
					{this.state.Collabs.map((collab) => {
						return(
						<div key={collab.id}>
							<h1 className='text-center'>Looking For:</h1>
							<h3 className='job-text text-center'>{collab.lookingFor}</h3>
						</div>
						);
					})}
					</div>
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
					{this.state.hasComments ?
					<div>
						{this.state.Comments.map((comment) => {
						return(
						<div key={comment.id} className='col-md-12'>

							<table className='table'>
								{comment.collabId === this.state.currentCollab ? 
								<tbody>
									<tr>
										<td>
											<div className='col-md-4 job-text'>
												{this.state.Profiles.map((profile) => {
							                      	return(
							                      		<div key={profile.id} className='col-md-12'>
							                      		{comment.uid === profile.uid && comment.collabId === this.state.currentCollab ?
							                      		<div>
							                      		<Link className='btn black-button' to={'/user/' + `${profile.id}`}><img src={profile.profilePicture} className='profile-pic center-block img-responsive img-circle' style={{width:40, height:40}} /></Link>
							                      		<p><small className='text-muted'>From:</small> {profile.name}</p>
							                      		</div>
							                      		:
							                      		null
							                      		
							                      		}
							                      		</div>
							                      	);
							                      })}
												
												{comment.collabId === this.state.currentCollab ? <p>{comment.time}</p> : null}
											</div>
											<div className='panel-group col-md-4'>
												<div className='panel panel-default col-md-12'>
													<div className='panel-body job-text col-md-12 comment text-black'>
														<div className='row'>{comment.commentBody}</div>
														<div className='btn-group row'>
															
															{comment.uid === this.state.authUser.uid ? 
																<button className='btn btn-danger job-text' onClick={() => this.removeComment(comment.id)}><span className='glyphicon glyphicon-trash'></span>  DELETE</button> 
																: 
																null
															}
															
															{comment.uid === this.state.authUser.uid ? 
																<Link to={`/edit-comment/${comment.id}`} className='btn btn-warning job-text text-black'><span className='glyphicon glyphicon-pencil'></span>  EDIT</Link> 
																: 
																null
															}
															
														</div>
													</div>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
								: null }
							</table>
						</div>
						);})}
					</div>
					:
					<div className='col-md-12 jobs-container'>
						<h1 className='text-center job-text'>No comments here yet</h1>
					</div>
					}
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default withRouter(ViewCollab);