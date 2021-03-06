import React, {Component} from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import './collab.css';


class EditComment extends Component {
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
			currentComment: this.props.match.params.currentComment,
			isOwnComment: false
	}

	this.handleChange = this.handleChange.bind(this);
	this.saveComment = this.saveComment.bind(this);
	
	}


	saveComment(e){
	  const updateRef = firebase.database().ref('Comments/' + this.state.currentComment);
	  const Collabs = {
  		commentBody: this.commentBody.value,
		time: new Date().toLocaleString()
	}
	updateRef.update(Collabs);
	  this.setState({
			commentBody:'',
			time:'',
	  });
		this.props.history.push("/view-collab/" + this.state.currentCollab);
	}


	handleChange(e) {
	    this.setState({
	    	[e.target.name]: e.target.value
	    });
	}




	componentDidMount(){
		const commentsRef = firebase.database().ref('Comments/' + this.state.currentComment);
		commentsRef.once('value', (snapshot) => {
			let newState = [];
			newState.push({
				commentBody: snapshot.val().commentBody,
				uid: snapshot.val().uid
			});
			
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
				<div className='row text-center'>
					<div  className='col-md-12'>
						<table className='table'>
							<tbody>
								<tr>
									<td>
										<div className='col-md-4 col-md-offset-4 text-center job-text'>
											
											<div>
												<div>
												{this.state.Comments.map((comment) => {
													return(
													<div key={comment.id}>
														<div>
														{comment.uid === this.state.authUser.uid ?
														<div>
														<h1 className='job-text text-center'>Edit Your Comment</h1>
														
														<textarea className='comment form-control' name='commentBody' defaultValue={comment.commentBody} ref={(commentBody) => this.commentBody = commentBody} onChange={this.handleChange} />
						
														</div> 
														: 
														<div><h1 className='job-text alert alert-danger'>Why are you trying to edit someone elses comment man? That's not cool bro.</h1></div>
														}
														</div>
														{comment.uid === this.state.authUser.uid ?
														<div className='text-center row'>
															<div className='btn-group'>
																<button className='btn btn-success job-text ' onClick={this.saveComment}><span className='glyphicon glyphicon-pencil'></span>  SAVE</button>
																<Link to={`/view-collab/${this.state.currentCollab}`} className='btn btn-danger job-text '><span className='glyphicon glyphicon-warning-sign'></span>  CANCEL</Link>
															</div>
														</div>
														:
														null}
													</div>
													);})}
												</div>
												
											</div>
											
											
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default EditComment;