import "./UserProfilePost.css";

const UserProfilePost = ({ post }) => {
	return (
		<div className="profile-post">
			<img src={post.imageUrl} alt="user-post" />
		</div>
	);
};

export default UserProfilePost;
