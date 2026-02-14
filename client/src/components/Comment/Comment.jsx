import { useState } from 'react';

import HeartIcon from '../icons/Heart';

import './Comment.css';

const Comment = ({ text }) => {
	const [setTriggerWrite] = useState(false);

	let loggedInUserHasLikedComment = true;
	return (
		<div className='comment-wrapper'>
			<div className='commenter-account-details'>
				<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />
			</div>

			<div className='comment-content'>
				<span className='commenter-username'>test username</span>

				<span className='comment-text' onClick={() => setTriggerWrite(true)}>
					{text}
				</span>

				<div className='comment-utils'>
					<button
						// onClick={
						// 	loggedInUserHasLikedUserPost
						// 		? () => onUnlikeUserPostHandler({ userPostToUnlikeId: userPostData._id })
						// 		: () => onLikeUserPostHandler({ userPostToLikeId: userPostData._id })
						// }
						className={'comment-like-btn'}
						// onMouseLeave={!loggedInUserHasLikedUserPost ? triggerPulse : () => {}}
					>
						<HeartIcon
							fillColorProp={loggedInUserHasLikedComment ? '#F64D4D' : 'none'}
							iconColorProp={loggedInUserHasLikedComment ? '#F64D4D' : null}
						/>
					</button>

					<span className='comment-util-label'>20 likes</span>

					<button className='comment-util-btn'>Reply</button>

					<button className='comment-util-btn'>View replies</button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
