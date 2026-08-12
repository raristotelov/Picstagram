import { useState, useContext } from 'react';

import HeartIcon from '../icons/Heart';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { likeComment, unlikeComment, addComment } from '../../services/commentService';

import './Comment.css';

const DEFAULT_AVATAR = 'https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg';

const Comment = ({ comment, userPostId, onReload, isReply }) => {
	const [showReplies, setShowReplies] = useState(false);
	const [isReplying, setIsReplying] = useState(false);
	const [replyText, setReplyText] = useState('');

	const { jwtToken, loggedInUser } = useContext(LoggedInUserContext);

	const author = comment.userId || {};
	const avatarUrl = author.profilePicture?.imageUrl || DEFAULT_AVATAR;
	const likes = comment.likes || [];
	const loggedInUserHasLikedComment = likes.includes(loggedInUser?._id);
	const replies = comment.replies || [];

	const toggleLike = async () => {
		try {
			if (loggedInUserHasLikedComment) {
				await unlikeComment({ commentId: comment._id, jwtToken });
			} else {
				await likeComment({ commentId: comment._id, jwtToken });
			}

			await onReload();
		} catch (error) {
			console.log('Something went wrong while liking a comment', error);
		}
	};

	const submitReply = async (e) => {
		e.preventDefault();

		if (!replyText.trim()) {
			return;
		}

		try {
			await addComment({ userPostId, text: replyText, parentCommentId: comment._id, jwtToken });

			setReplyText('');
			setIsReplying(false);
			setShowReplies(true);

			await onReload();
		} catch (error) {
			console.log('Something went wrong while replying to a comment', error);
		}
	};

	return (
		<div className='comment-wrapper'>
			<div className='commenter-account-details'>
				<img src={avatarUrl} alt='commenter-avatar' />
			</div>

			<div className='comment-content'>
				<span className='commenter-username'>{author.username}</span>

				<span className='comment-text'>{comment.text}</span>

				<div className='comment-utils'>
					<button className='comment-like-btn' onClick={toggleLike}>
						<HeartIcon
							fillColorProp={loggedInUserHasLikedComment ? '#F64D4D' : 'none'}
							iconColorProp={loggedInUserHasLikedComment ? '#F64D4D' : null}
						/>
					</button>

					<span className='comment-util-label'>{`${likes.length} ${likes.length === 1 ? 'like' : 'likes'}`}</span>

					{!isReply ? (
						<button className='comment-util-btn' onClick={() => setIsReplying((state) => !state)}>
							Reply
						</button>
					) : null}

					{!isReply && replies.length ? (
						<button className='comment-util-btn' onClick={() => setShowReplies((state) => !state)}>
							{showReplies ? 'Hide replies' : `View replies (${replies.length})`}
						</button>
					) : null}
				</div>

				{isReplying ? (
					<form className='reply-form' onSubmit={submitReply}>
						<input
							type='text'
							className='add-comment-input'
							placeholder='Write a reply...'
							value={replyText}
							onChange={(e) => setReplyText(e.target.value)}
						/>
					</form>
				) : null}

				{!isReply && showReplies ? (
					<div className='replies-wrapper'>
						{replies.map((reply) => (
							<Comment key={reply._id} comment={reply} userPostId={userPostId} onReload={onReload} isReply />
						))}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default Comment;
