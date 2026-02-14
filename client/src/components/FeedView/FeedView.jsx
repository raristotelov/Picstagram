import UserPost from '../UserPost/UserPost';

import './FeedView.css';

const FeedView = (props) => {
	const { posts } = props;

	return <div className='feed-posts-wrapper'>{posts?.length ? posts.map((post) => <UserPost key={post._id} userPostData={post} />) : null}</div>;
};

export default FeedView;
