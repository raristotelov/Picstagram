import { useState, useEffect, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

import { storage } from '../../firebase';
import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { getAllUserPosts, addUserPost } from "../../services/userPostService";

import ProfileHeader from '../ProfileHeader/ProfileHeader';
import UserProfilePost from '../UserProfilePost/UserProfilePost';
import Popup from '../Popup/Popup';
import AddImagePostForm from '../AddImagePostForm/AddImagePostForm';
import PlusIcon from '../icons/Plus';

import './ProfileView.css';

const ProfileView = () => {
	const [isAddPicturePopupOpen, setIsAddPicturePopupOpen] = useState(false);
	const [userPosts, setUserPosts] = useState([]);

	const { jwtToken } = useContext(LoggedInUserContext);

	useEffect(() => {
		getAllUserPosts(jwtToken)
			.then((allUserPosts) => {
				setUserPosts(allUserPosts);
			})
			.catch((error) => {
				// TODO add some error handling
				console.log("something went wrong while trying to fetch");
			})
	}, [jwtToken]);

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
		} catch {
			// TODO add some error handling
			console.log("Something went wrong while trying to uploade image");
		}
	};
	
	return (
		<div className="profile-view-wrapper">
			<ProfileHeader />

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
							/>
						</ Popup>
					)
					: null
				}
		</div>
	)
}

export default ProfileView;
