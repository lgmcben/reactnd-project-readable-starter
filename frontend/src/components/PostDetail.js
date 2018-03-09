import React, { Component } from 'react';
import { connect } from 'react-redux';

class PostDetail extends Component{
    render() {
        return(
            <h1>{this.props.match.params.post_id} </h1>
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
