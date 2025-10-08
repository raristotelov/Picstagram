import { useState, useEffect, useContext, useMemo } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';

import { storage } from '../../firebase';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { addUserPost } from '../../services/userPostService';
import { getUsersProfileData, updateUserProfileData, followUser, unfollowUser } from '../../services/userService';

import ProfileHeader from '../ProfileHeader/ProfileHeader';
import UserProfilePost from '../UserProfilePost/UserProfilePost';
import Popup from '../Popup/Popup';
import AddImagePostForm from '../AddImagePostForm/AddImagePostForm';
import EditProfileForm from '../EditProfileForm/EditProfileForm';
import PlusIcon from '../icons/Plus';

import './ProfileView.css';

const uploadImageToFirebaseStorage = async (imageData) => {
	try {
		const imageIdentifier = `/userUploadedImages/${imageData.name + v4()}`;

		const imageRef = ref(storage, imageIdentifier);

		await uploadBytes(imageRef, imageData);

		const imageUrl = await getDownloadURL(imageRef);

		const createdImage = { imageIdentifier, imageUrl };

		return createdImage;
	} catch(error) {
		// TODO add some error handling
		console.log('Something went wrong while trying to uploade image');
	}
}

const ProfileView = (props) => {
	const [userPosts, setUserPosts] = useState([]);
	const [userData, setUserData] = useState(null);
	const [isAddPicturePopupOpen, setIsAddPicturePopupOpen] = useState(false);
	const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);

	const { jwtToken, loggedInUser, updateLoggedInUser } = useContext(LoggedInUserContext);

	let { userId } = useParams();

	const isLoggedInUserProfile = useMemo(() => {
		return userId === loggedInUser?._id;
	}, [userId, loggedInUser]);

	useEffect(() => {
		getUsersProfileData({ userIds: [userId], jwtToken })
			.then((result) => {
				setUserData(result[0]);
				setUserPosts(result[0].posts);
			}).catch(() => {
				console.log('something went wrong while trying to fetch user data');
			})
	}, [userId, jwtToken, isLoggedInUserProfile, loggedInUser]);

	const openAddPictureForm = () => {
		setIsAddPicturePopupOpen(true);
	};

	const closeAddPictureForm = () => {
		setIsAddPicturePopupOpen(false);
	};

	const addImagePostHandler = async (uploadedImage) => {
		if (uploadedImage === null) {
			return;
		}

		try {
			const imageIdentifier = `/userUploadedImages/${uploadedImage.name + v4()}`;
			const imageRef = ref(storage, imageIdentifier);
			await uploadBytes(imageRef, uploadedImage);
			const imageUrl = await getDownloadURL(imageRef);

			const createdImage = { imageIdentifier, imageUrl };
			
			const savedUserPost = await addUserPost(createdImage, jwtToken);

			setUserPosts((state) => [...state, savedUserPost]);

			closeAddPictureForm();
		} catch(error) {
			// TODO add some error handling
			console.log('Something went wrong while trying to uploade image');
		}
	};

	const openEditProfileForm = () => {
		setIsEditProfileFormOpen(true);
	}

	const closeEditProfileForm = () => {
		setIsEditProfileFormOpen(false);
	}

	const editProfileDataHandler = async (userUpdatedData) => {
		try {
			let updatedProfileData = { ...userUpdatedData };

			if (updatedProfileData.profilePicture) {
				const createdImageForProflePicrture = await uploadImageToFirebaseStorage(updatedProfileData.profilePicture);
				updatedProfileData = {...updatedProfileData, profilePicture: createdImageForProflePicrture };
			}

			const updatedUser = await updateUserProfileData({ userId, jwtToken, updatedProfileData });

			setUserData(updatedUser);

			closeEditProfileForm();
		} catch(error) {
			// TODO add some error handling
			console.log('Something went wrong while trying to update user profile');
		}
	}

	const followUserHandler = async (userIdToFollow) => {
		try {
			const updatedUserData = await followUser({ userId: loggedInUser?._id, jwtToken, userIdToFollow });

			updateLoggedInUser(updatedUserData);
		} catch(error) {

		}
	}

	const onUnfollowUserHandler = async (userIdToUnfollow) => {
		try {
			const updatedUserData = await unfollowUser({ userId: loggedInUser?._id, jwtToken, userIdToUnfollow });

			updateLoggedInUser(updatedUserData);
		} catch(error) {

		}
	}

	if (!userData) {
		return null;
	}

	return (
		<div className='profile-view-wrapper'>
			<ProfileHeader
				userData={userData}
				loggedInUserData={loggedInUser}
				isLoggedInUserProfile={isLoggedInUserProfile}
				onEditProfileClick={openEditProfileForm}
				onFollowUserClick={followUserHandler}
				onUnfollowUserClick={onUnfollowUserHandler}
			/>

			<section className='profile-posts-wrapper'>
				<button className='add-post-button' onClick={openAddPictureForm}>
					<PlusIcon iconColorProp='#B5B5B5' />

					<span>Upload Picture</span>
				</button>

				{userPosts.map((post) => (
					<UserProfilePost key={post.imageIdentifier} post={post} />
				))}
			</section>

			{isAddPicturePopupOpen
				? (
					<Popup
						onClosePopupClick={closeAddPictureForm}
					>
						<AddImagePostForm
							addImagePostHandler={addImagePostHandler}
							onCancelClick={closeAddPictureForm}
						/>
					</ Popup>
				)
				: null
			}

			{isEditProfileFormOpen
				? (
					<Popup
						onClosePopupClick={closeEditProfileForm}
					>
						<EditProfileForm
							userData={userData}
							editProfileData={editProfileDataHandler}
							onCancelClick={closeEditProfileForm}
						/>
					</Popup>
				) : null
			}
		</div>
	)
};

export default ProfileView;
