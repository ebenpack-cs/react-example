import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../Spinner';
import {fetchPostsActionDispatcher} from './postsModule';

const Post = ({title, body}) => (
    <div>
        <h2>{title}</h2>
        <div>{body}</div>
    </div>
);

const Posts = ({posts, fetchPosts, showSpinner}) => (
    <Spinner showSpinner={showSpinner}>
        {/* We could make a thunk for the `onClick` handler (i.e. `()=>fetchPosts()`), but
          * but so long as we are ignoring the `event` parameter which will be passed in,
          * and the action creator doesn't need to be passed any arguments of its own we can
          * get away with passing the action creator function directly, as seen here */}
        <button key="fetch-button" onClick={fetchPosts}>Fetch Posts</button>
        {posts.map(post => [
            <hr key={`hr-${post.get('id')}`}/>,
            <Post key={`post-${post.get('id')}`} title={post.get('title')} body={post.get('body')}/>
        ])}
    </Spinner>
);

const mapDispatchToProps = {
    fetchPosts: fetchPostsActionDispatcher
};

const mapStateToProps = state => ({
    posts: state.posts.get('posts'),
    showSpinner: state.posts.get('fetching')
});

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
