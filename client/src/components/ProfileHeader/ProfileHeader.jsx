import Button from "../Button/Button";

import "./ProfileHeader.css";

const ProfileHeader = () => {
	return (
		<header className="profile-header">
			<div className="profile-picture-wrapper">
				<img src="/images/default-profile-picture.png" alt="" />
			</div>

			<div className="user-data-wrapper">
				<div className="username-section">
					<span className="username">username is here</span>
					
					<Button
						label="Edit Profile"
					/>
				</div>

				<div className="followers-data-wrapper">
					<span>6 posts</span>

					<span>100 followers</span>

					<span>50 following</span>
				</div>

				<p className="bio">
					This paragraph will be used for the bio of the account
				</p>
			</div>
		</header>
	);
};

export default ProfileHeader;
