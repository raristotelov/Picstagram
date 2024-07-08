import { useState, useEffect, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { useParams } from 'react-router-dom';

import { storage } from '../../firebase';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { getAllUserPosts, addUserPost } from "../../services/userPostService";
import { updateUserProfileData } from "../../services/userService";

import { getUserAccountData } from '../../services/userService';

import ProfileHeader from '../ProfileHeader/ProfileHeader';
import UserProfilePost from '../UserProfilePost/UserProfilePost';
import Popup from '../Popup/Popup';
import AddImagePostForm from '../AddImagePostForm/AddImagePostForm';
import EditProfileForm from "../EditProfileForm/EditProfileForm";
import PlusIcon from '../icons/Plus';

import './ProfileView.css';

const ProfileView = (props) => {
	const [userPosts, setUserPosts] = useState([]);
	const [userData, setUserData] = useState(null);
	const [isAddPicturePopupOpen, setIsAddPicturePopupOpen] = useState(false);
	const [isEditProfileFormOpen, setIsEditProfileFormOpen] = useState(false);

	const { jwtToken, loggedInUser } = useContext(LoggedInUserContext);

	let { userId } = useParams();

	const isLoggedInUserProfile = userId === loggedInUser?._id;

	useEffect(() => {
		getUserAccountData(userId, jwtToken)
			.then((result) => {
				setUserData(result[0]);
				setUserPosts(result[0].posts);
			}).catch(() => {
				console.log("something went wrong while trying to fetch user data");
			})
	}, [userId, jwtToken]);

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
			console.log("Something went wrong while trying to uploade image");
		}
	};

	const openEditProfileForm = () => {
		setIsEditProfileFormOpen(true);
	}

	const closeEditProfileForm = () => {
		setIsEditProfileFormOpen(false);
	}

	const editProfileDataHandler = async (userUpdatedData) => {
		const updatedUser = await updateUserProfileData(userId, jwtToken, userUpdatedData);

		setUserData(updatedUser);
		closeEditProfileForm();
	}

	if (!userData) {
		return null;
	}

	return (
		<div className="profile-view-wrapper">
			<ProfileHeader
				userData={userData}
				isLoggedInUserProfile={isLoggedInUserProfile}
				onEditProfileClick={openEditProfileForm}
			/>

			<section className="profile-posts-wrapper">
				<button className="add-post-button" onClick={openAddPictureForm}>
					<PlusIcon iconColorProp="#B5B5B5" />

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
