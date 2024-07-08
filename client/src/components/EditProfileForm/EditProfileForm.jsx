import { useState, useEffect, useRef } from "react";

import { useForm } from "../../hooks/useForm";

import Button from "../Button/Button";
import PictureFrameIcon from "../icons/PictureFrameIcon";
import ImageInput from "../ImageInput/ImageInput";
import AddProfilePictureIcon from "../icons/AddProfilePictureIcon";

const EditProfileForm = ({ userData, editProfileData }) => {
	const { values, changeHandler, onSubmit } = useForm({
        email: userData.email,
		username: userData.username,
		bio: userData.bio ? userData.bio : "",
        password: '',
    }, editProfileData);

	const [uploadedImage, setUploadedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const inputRef = useRef(null);

	const onChangeHandler = (e) => {
		
	}

	const onCancelClick = () => {
	
	}

	return (
		<form
			id="edit-user-profile-form"
			onSubmit={onSubmit}
			className="edit-user-profile-form"
		>
			<h1>Edit Profile</h1>

			<ImageInput
				onChange={setUploadedImage}
				PlaceHolderImageProp={AddProfilePictureIcon}
				isRoundImage={true}
				imageWidthProp={120}
				imageHeightProp={120}
				iconWidthProp={60}
				iconHeightProp={60}
				fontSizeProp={13}
			/>

			<div className="input-wrapper">
				<input
					type="email"
					id="email"
					name="email"
					placeholder="Email"
					value={values.email}
					onChange={changeHandler}
				/>
			</div>

			<div className="input-wrapper">
				<input
					type="username"
					id="username"
					name="username"
					placeholder="Username"
					value={values.username}
					onChange={changeHandler}
				/>
			</div>

			<div className="input-wrapper">
				<input
					type="password"
					id="password"
					name="password"
					placeholder="password"
					value={values.password}
					onChange={changeHandler}
				/>
			</div>

			<div className="input-wrapper">
				<input
					type="bio"
					id="bio"
					name="bio"
					placeholder="bio"
					value={values.bio}
					onChange={changeHandler}
				/>
			</div>

			<div className="button-row">
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
