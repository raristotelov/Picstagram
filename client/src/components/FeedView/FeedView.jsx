
import { useState, useEffect, useContext } from 'react';

import { getFollowedUsersPosts } from '../../services/userPostService';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import UserPost from '../UserPost/UserPost';

import './FeedView.css';

const Main = () => {
	const [followedUsersPosts, setFollowedUsersPosts] = useState(null);

	const { jwtToken } = useContext(LoggedInUserContext);

	useEffect(() => {
		getFollowedUsersPosts({ jwtToken })
			.then((result) => {
				setFollowedUsersPosts(result);
			}).catch(() => {
				console.log('something went wrong while trying to fetch user data');
			})
	}, [jwtToken]);

    return (
		<div className='feed-posts-wrapper'>
			{followedUsersPosts?.length 
				? followedUsersPosts.map((userPost) => (
					<UserPost {...userPost} />
				))
				: null 
			}
		</div>
    );
};

export default Main;
