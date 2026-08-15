import UserProfilePost from '../UserProfilePost/UserProfilePost';

import './PopularPostsView.css';

const PopularPostsView = () => {
	// Real posts arrive with the Popular page ticket; until then there is nothing to
	// show rather than a grid of placeholder images.
	const userPosts = [];

	return (
		<section className='popular-posts-wrapper'>
			{userPosts.map((post) => (
				<UserProfilePost key={post.imageIdentifier} post={post} />
			))}
		</section>
	);
};

export default PopularPostsView;
