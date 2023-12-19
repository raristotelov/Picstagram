import Button from "../Button/Button";

import "./ProfileHeader.css";

const ProfileHeader = (props) => {
	const {
		username,
		totalPostsCount,
		followersCount,
		followingCount,
		bio
	} = props;

	return (
		<header className="profile-header">
			<div className="profile-picture-wrapper">
				<img src="/images/default-profile-picture.png" alt="" />
			</div>

			<div className="user-data-wrapper">
				<div className="username-section">
					<span className="username">{username}</span>
					
					<Button
						label="Edit Profile"
					/>
				</div>

				<div className="followers-data-wrapper">
					<span>{totalPostsCount} posts</span>

					<span>{followersCount} followers</span>

					<span>{followingCount} following</span>
				</div>

				<p className="bio">
					{bio}
				</p>
			</div>
		</header>
	);
};

export default ProfileHeader;
