import React, {Component} from 'react';
import * as firebase from 'firebase';
import { auth } from '../../firebase';

class CommentSection extends Component {
	constructor(props){
		super(props)
		this.state = {
			authUser: null,
			Collabs:[],
			Comments: [],
		}
    this.removeItem = this.removeItem.bind(this);
	}

	removeItem(commentId) {
	    const commentsRef = firebase.database().ref('Collabs' + this.state.currentCollab + `/Comments/${commentId}`);
	    commentsRef.remove();
	    window.location.reload();
	}


	componentDidMount(){
		const commentsRef = firebase.database().ref('Collabs/' + this.state.currentCollab + '/Comments');
		commentsRef.once('value', (snapshot) => {
			let Comments = snapshot.val();
			let newState = [];
			for (let comment in Comments){			
			newState.push({
				id: comment,
				name: Comments[comment].name,
				photo: Comments[comment].photo,
				uid: Comments[comment].uid,
				comment: Comments[comment].comment,
				time: Comments[comment].time,
			});
			}
			this.setState({
				Comments: newState
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
			<div>
			{this.state.authUser ?
			<div>
				<div className='col-md-12'>
					{this.state.Comments.map((comment) => {
						return(
							<div key={comment.id}>
								<div className='col-md-3'><img src={comment.photo} className='center-block img-responsive img-circle' style={{with:40, height:40}} /></div>
								<div className='col-md-6 text-center job-text'>
									<p>{comment.comment}</p>
									<p><small>From:</small> {comment.name}</p>
									<p>{comment.time}</p>
								</div>
								<div className='col-md-3 text-center'>
								{comment.uid === this.state.authUser.uid ? <button className='btn btn danger' onClick={() => this.removeItem(comment.id)}>DELETE</button> : null}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default CommentSection;