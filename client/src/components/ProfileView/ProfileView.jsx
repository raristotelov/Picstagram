import ProfileHeader from "../ProfileHeader/ProfileHeader";
import UserProfilePost from "../UserProfilePost/UserProfilePost";
import PlusIcon from "../icons/Plus";

import "./ProfileView.css";

const ProfileView = () => {
	return (
		<div className="profile-view-wrapper">
			<ProfileHeader />

			<section className="profile-posts-wrapper">
				<button className="add-post-button">
					<PlusIcon iconColorProp="#B5B5B5" />

					<span>Add Picture</span>
				</button>

				<UserProfilePost />

				<UserProfilePost />

				<UserProfilePost />

				<UserProfilePost />
			</section>
		</div>
	)
}

export default ProfileView;
