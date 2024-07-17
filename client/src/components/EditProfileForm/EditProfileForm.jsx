import { useState } from "react";

import { useForm } from "../../hooks/useForm";

import Button from "../Button/Button";
import ImageInput from "../ImageInput/ImageInput";
import AddProfilePictureIcon from "../icons/AddProfilePictureIcon";

import "./EditProfileForm.css";

const EditProfileForm = ({ userData, editProfileData, onCancelClick }) => {
	const [profilePicture, setProfilePicture] = useState(null);

	const editProfileDataHandler = (updatedValues) => {
		let updatedUserValues = { ...updatedValues };

		if (profilePicture) {
			updatedUserValues = { ...updatedValues, profilePicture};
		}

		editProfileData(updatedUserValues);
	}

	const { values, changeHandler, onSubmit } = useForm({
        email: userData.email,
		username: userData.username,
		bio: userData.bio ? userData.bio : "",
        password: "",
    }, editProfileDataHandler);

	return (
		<form
			id="edit-user-profile-form"
			onSubmit={onSubmit}
			className="edit-user-profile-form"
		>
			<h1>Edit Profile</h1>

			<div className="profile-form-profile-picture-wrapper">
				<ImageInput
					initialValue={userData?.profilePicture?.imageUrl}
					onChange={setProfilePicture}
					PlaceHolderImageProp={AddProfilePictureIcon}
					isRoundImage={true}
					imageWidthProp={120}
					imageHeightProp={120}
					iconWidthProp={60}
					iconHeightProp={60}
					fontSizeProp={13}
				/>
			</div>

			<div className="profile-form-input-wrapper">
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					value={values.email}
					onChange={changeHandler}
				/>
			</div>

			<div className="profile-form-input-wrapper">
				<input
					type="username"
					id="username"
					name="username"
					placeholder="Username"
					value={values.username}
					onChange={changeHandler}
				/>
			</div>

			<div className="profile-form-input-wrapper">
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					value={values.password}
					onChange={changeHandler}
				/>
			</div>

			<div className="profile-form-input-wrapper">
				<input
					type="bio"
					id="bio"
					name="bio"
					placeholder="bio"
					value={values.bio}
					onChange={changeHandler}
				/>
			</div>

			<div className="profile-form-button-row">
				<Button
					type="submit"
					label="Submit"
				/>

				<Button
					type="button"
					label="Cancel"
					onClick={onCancelClick}
				/>
			</div>
		</form>
	)
}

export default EditProfileForm;
