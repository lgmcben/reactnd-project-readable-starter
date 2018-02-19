import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadAllPosts } from '../actions'

class PostList extends Component {

    componentDidMount() {
        this.props.doLoadAllPost();
    }

    render() {
        console.log('Props', this.props);
        return (
            <h1>Post list</h1>
        );
    }
}

function mapStateToProps (state, ownProps) {
    return {
        postList: state.postList
    }
}

function mapDispatchToProps (dispatch) {
    return {
        doLoadAllPost: () => dispatch(loadAllPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
