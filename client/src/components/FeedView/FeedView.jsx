
import UserPost from '../UserPost/UserPost';

import './FeedView.css';

const Main = () => {
	console.log("main");
	
    return (
		<div className="posts-wrapper">
			<UserPost />
			<UserPost />

			{/* <FollowerPost />
			<FollowerPost /> */}

		</div>
    );
};

export default Main;
