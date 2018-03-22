import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class PostNotFound extends Component {
	render(){
		return (
			<div>
                <p>404 post not found or is deleted</p>
                <Link to='/'>Back to post list</Link>
            </div>
		)
	}
}

export default PostNotFound;
