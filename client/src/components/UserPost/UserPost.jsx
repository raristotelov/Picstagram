import { useState, useContext } from 'react';

import Comment from '../Comment/Comment';
import LikeIcon from '../icons/Like';
import CommentIcon from '../icons/Comment';
import ArrowUpIcon from '../icons/ArrowUp';
import ArrowDownIcon from '../icons/ArrowDown';

import { likeUserPost, unlikeUserPost } from '../../services/userPostService';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';

import './UserPost.css';

const UserPost = (props) => {
	const [toggledCommentsSection, setToggledCommentsSection] = useState(false);

	const { userPostData } = props;

	const userPostAuthor = userPostData.userId;

	const { jwtToken, loggedInUser, setLoggedInUser } = useContext(LoggedInUserContext);

	const toggleCommentsSection = () => {
		setToggledCommentsSection((state) => !state);
	}

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
					followedUsersPosts: [
						...followedUsersPosts.filter((userPost) => userPost._id !== updatedUserPostData._id),
						currUserPost
					].sort((a, b) => b.createdAt - a.createdAt)
				}
			});
		} catch(error) {
			console.log("error", error);
		}
	}

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
					followedUsersPosts: [
						...followedUsersPosts.filter((userPost) => userPost._id !== updatedUserPostData._id),
						currUserPost
					].sort((a, b) => b.createdAt - a.createdAt)
				}
			});
		} catch(error) {
			console.log("error", error);
		}
	}

	const loggedInUserHasLikedUserPost = userPostData.likes.includes(loggedInUser?._id);

    return (
        <div className='post-wrapper'>
            <div className='account-details'>
				<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />

                <h4>{userPostAuthor.username}</h4>
            </div>

            <div className='post-image-wrapper'>
                <img src={`${userPostData.imageUrl}`} alt='post-img' />
            </div>

            <div className='like-action-wrapper'>
				<span>{userPostData.likes.length} likes</span>

				<button
					onClick={
						loggedInUserHasLikedUserPost 
							? () => onUnlikeUserPostHandler({ userPostToUnlikeId: userPostData._id }) 
							: () => onLikeUserPostHandler({ userPostToLikeId: userPostData._id })
					}
					className='like-btn'
				>
					<LikeIcon fillColorProp={loggedInUserHasLikedUserPost ? "#4B4B4B" : "none"} />
				</button>
            </div>

			<div className='comments-section-toggle-wrapper'>
				<div className='comments-count-section'>
					<CommentIcon />

					<span>5 comments</span>
				</div>
				
				<button
					className='toggle-comments-btn'
					onClick={toggleCommentsSection}
				>
					{toggledCommentsSection ? <ArrowUpIcon /> : <ArrowDownIcon />}
				</button>
            </div>

			{toggledCommentsSection
				? (
					<div className='comments-wrapper'>
						<Comment />
					</div>
				) : null
			}
        </div>
    );
};

export default UserPost;
