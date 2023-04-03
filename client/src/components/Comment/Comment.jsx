const Comment = ({ text }) => {
	return (
		<div className="comment-wrapper">
			<span>
				{text}
			</span>

			<div className="comment-replies-wrapper">
				<Comment />

			</div>
		</div>
	);
}

export default Comment;