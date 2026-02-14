import { useState, useContext } from 'react';

import Comment from '../Comment/Comment';
import CommentIcon from '../icons/Comment';
import ArrowUpIcon from '../icons/ArrowUp';
import ArrowDownIcon from '../icons/ArrowDown';
import HeartIcon from '../icons/Heart';

import { likeUserPost, unlikeUserPost } from '../../services/userPostService';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import Popup from '../Popup/Popup';

import './UserPost.css';

const UserPost = (props) => {
	const [toggledCommentsSection] = useState(false);
	const [isHeartPulsing, setIsHeartPulsing] = useState(false);
	const [isCommentsPopupOpen, setIsCommentsPopupOpen] = useState(false);

	const { userPostData } = props;

	const userPostAuthor = userPostData.userId;

	const { jwtToken, loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

	const toggleCommentsSection = () => {
		// setToggledCommentsSection((state) => !state);

		setIsCommentsPopupOpen(true);
	};

	const triggerPulse = () => {
		setIsHeartPulsing(true);
		setTimeout(() => setIsHeartPulsing(false), 500);
	};

	const onLikeUserPostHandler = async ({ userPostToLikeId }) => {
		try {
			const updatedUserPostData = await likeUserPost({ userPostToLikeId, jwtToken });

			// TODO make this better
			setLoggedInUser((currLoggedInUser) => {
				const followedUsersPosts = currLoggedInUser.followedUsersPosts;

				const currUserPost = followedUsersPosts.find((userPost) => userPost._id === updatedUserPostData._id);

				currUserPost.likes = updatedUserPostData.likes;

				return {
					...currLoggedInUser,
					followedUsersPosts: [...followedUsersPosts.filter((userPost) => userPost._id !== updatedUserPostData._id), currUserPost].sort(
						(a, b) => b.createdAt - a.createdAt
					),
				};
			});

			triggerPulse();
		} catch (error) {
			console.log('error', error);
		}
	};

	const onUnlikeUserPostHandler = async ({ userPostToUnlikeId }) => {
		try {
			const updatedUserPostData = await unlikeUserPost({ userPostToUnlikeId, jwtToken });

			// TODO make this better
			setLoggedInUser((currLoggedInUser) => {
				const followedUsersPosts = currLoggedInUser.followedUsersPosts;

				const currUserPost = followedUsersPosts.find((userPost) => userPost._id === updatedUserPostData._id);

				currUserPost.likes = updatedUserPostData.likes;

				return {
					...currLoggedInUser,
					followedUsersPosts: [...followedUsersPosts.filter((userPost) => userPost._id !== updatedUserPostData._id), currUserPost].sort(
						(a, b) => b.createdAt - a.createdAt
					),
				};
			});
		} catch (error) {
			console.log('error', error);
		}
	};

	const closeCommentsPopup = () => {
		setIsCommentsPopupOpen(false);
	};

	const loggedInUserHasLikedUserPost = userPostData.likes.includes(loggedInUser?._id);

	const AddCommentInput = () => {
		return (
			<div className='add-comment-textarea-wrapper'>
				<input type='text' className='add-comment-input' placeholder='Add a comment...' />
			</div>
		);
	};

	return (
		<div className='post-wrapper'>
			<div className='account-details'>
				<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />

				<span>{userPostAuthor.username}</span>
			</div>

			<div className='post-image-wrapper'>
				<img src={`${userPostData.imageUrl}`} alt='post-img' />
			</div>

			<div className='like-action-wrapper'>
				<button
					onClick={
						loggedInUserHasLikedUserPost
							? () => onUnlikeUserPostHandler({ userPostToUnlikeId: userPostData._id })
							: () => onLikeUserPostHandler({ userPostToLikeId: userPostData._id })
					}
					className={`like-btn ${isHeartPulsing ? 'heart-pulse' : ''}`}
					onMouseLeave={!loggedInUserHasLikedUserPost ? triggerPulse : () => {}}
				>
					<HeartIcon
						fillColorProp={loggedInUserHasLikedUserPost ? '#F64D4D' : 'none'}
						iconColorProp={loggedInUserHasLikedUserPost ? '#F64D4D' : null}
					/>
				</button>

				<span>
					{userPostData.likes.length}

					{userPostData.likes.length === 1 ? ' like' : ' likes'}
				</span>
			</div>

			<div className='comments-section'>
				<div className='comments-section-toggle-wrapper' onClick={toggleCommentsSection}>
					<div className='comments-count-section'>
						<CommentIcon />

						<span>5 comments</span>
					</div>

					<button className='toggle-comments-btn'>{toggledCommentsSection ? <ArrowUpIcon /> : <ArrowDownIcon />}</button>
				</div>

				{toggledCommentsSection ? (
					<div className='comments-wrapper'>
						<Comment
							text={`This is a test comment which is really long because 
								it is a test comment which is really long because it is a test comment which is really long`}
						/>
					</div>
				) : null}
			</div>

			<AddCommentInput />

			{isCommentsPopupOpen ? (
				<Popup onClosePopupClick={closeCommentsPopup}>
					<div className='comments-wrapper'>
						<Comment
							text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
								sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
						/>

						<Comment
							text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
								labore et dolore magna aliqua. Ut enim ad minim veniam, 
								quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
						/>

						<Comment
							text={`Lorem ipsum dolor sit amet, 
								consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
						/>

						<Comment
							text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
								sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
								Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
						/>
					</div>

					<AddCommentInput />
				</Popup>
			) : null}
		</div>
	);
};

export default UserPost;
