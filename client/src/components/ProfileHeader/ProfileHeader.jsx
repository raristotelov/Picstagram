import Button from '../Button/Button';

import './ProfileHeader.css';

const ProfileHeader = (props) => {
	const { userData, loggedInUserData, onEditProfileClick, onFollowUserClick, onUnfollowUserClick, isLoggedInUserProfile } = props;

	const totalPostsCount = userData?.posts?.length ? userData.posts.length : 0;
	const followersCount = userData?.followers?.length ? userData.followers.length : 0;
	const followingCount = userData?.following?.length ? userData.following.length : 0;
	const bio = userData.bio ? userData.bio : 'No bio';

	const profilePictureUrl = userData?.profilePicture?.imageUrl ? userData.profilePicture.imageUrl : '/images/default-profile-picture.png';

	return (
		<header className='profile-header'>
			<div className='profile-picture-wrapper'>
				<img src={profilePictureUrl} alt='' />
			</div>

			<div className='user-data-wrapper'>
				<div className='username-section'>
					<span className='username'>{userData.username}</span>

					{isLoggedInUserProfile ? <Button onClick={onEditProfileClick} label='Edit Profile' /> : null}
				</div>

				<div className='followers-data-wrapper'>
					<span>{totalPostsCount} posts</span>

					<span>{followersCount} followers</span>

					<span>{followingCount} following</span>
				</div>

				<p className='bio'>{bio}</p>

				<div className='follow-button-wrapper'>
					{!isLoggedInUserProfile ? (
						<Button
							onClick={() => {
								if (loggedInUserData?.following?.includes(userData._id)) {
									onUnfollowUserClick(userData._id);
								} else {
									onFollowUserClick(userData._id);
								}
							}}
							label={loggedInUserData?.following?.includes(userData._id) ? 'Unfollow' : 'Follow'}
						/>
					) : null}
				</div>
			</div>
		</header>
	);
};

export default ProfileHeader;
