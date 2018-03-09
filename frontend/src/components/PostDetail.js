import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostDetail extends Component{
    render() {
        const post = this.props.postList.find(post => post.id === this.props.match.params.post_id);
        return(
            <h1>{post.title}</h1>

        )
    }
}

function mapStateToProps ({post, comment, category}, ownProps) {
    return {
        postList: post.postList,
    }
}

function mapDispatchToProps (dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
