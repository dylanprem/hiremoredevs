import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Link } from 'react-router-dom';
import SignInForm from '../Auth/login';

class CollabsPosted extends Component {
	constructor(props){
	super(props);
	this.state = {
		Collabs: [],
		authUser: null,
		hasPosts:false
		}
	this.removeItem = this.removeItem.bind(this);
	}


	removeItem(Id) {
	    const collabRef = firebase.database().ref(`Collabs/${Id}`);
	    collabRef.remove();
	    // window.location.reload();
	}

	componentDidMount() {
	   // window.addEventListener('load', this.createProfile);
	   const collabRef = firebase.database().ref('Collabs');
	   collabRef.on('value', (snapshot) => {
	    let Collabs = snapshot.val();
	    let newState = [];
	    for (let c in Collabs) {
	      newState.push({
	        id: c,
		    uid: Collabs[c].uid,
		    title: Collabs[c].title,
	      });
	    }
	    this.setState({
	      Collabs: newState
	    });
	  });



	   firebase.auth().onAuthStateChanged((authUser) => {
	      if (authUser) {
	        this.setState({ authUser });
	        firebase.database().ref("Collabs").orderByChild("uid").equalTo(this.state.authUser.uid).once("value", snapshot => {
				    const postData = snapshot.val();
				    if (postData) {
						this.setState({hasPosts:true});
				    } else {
				    	this.setState({hasPosts:false});
				    }
				});
	        
			} 
    	});
	}


	

	render(){

		return(
			<div className='row dark-bg-feed'>
			
			{this.state.authUser ? 
			<div className='col-md-12'>
				<div>
					{this.state.hasPosts ?
					<div>
						<h1 className="text-center job-text">COLLABS POSTED BY YOU</h1>
						<table className="table jobs-table">
							    <thead>
							      <tr>
							      	<th>Title</th>
							        <th>View Details</th>
							      </tr>
							    </thead>
							    <tbody>
							    {this.state.Collabs.map((c) => {
			    		  			return(
								    <tr className='active' key={c.id}>
				            
				                      <td>{c.uid === this.state.authUser.uid ? c.title : null}</td>
				             
				                      <td>{c.uid === this.state.authUser.uid ? <Link className='btn black-button btn-sm' to={`view-collab/${c.id}`}>View Details</Link> : null }</td> 
			                      	  <td>{c.uid === this.state.authUser.uid ? <button type='submit' className="btn btn-danger" onClick={() => this.removeItem(c.id)}>Delete</button> : null}</td>
				                    </tr>
					                    );
				          			})}
				          		      
							    </tbody>
						</table>
					</div>
					: <h1 className='job-text text-center'>You haven't posted any collabs yet.</h1> }
				</div>
			</div>
			:
			null}
			</div>
		);
	}
}

export default CollabsPosted;