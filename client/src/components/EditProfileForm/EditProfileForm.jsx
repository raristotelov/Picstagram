import { useState, useEffect, useRef } from "react";

import Button from "../Button/Button";
import PictureFrameIcon from "../icons/PictureFrame";

const EditProfileForm = ({ submitProfileChanges }) => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const inputRef = useRef(null);

	const onSubmit = (e) => {
		e.preventDefault();

		submitProfileChanges();
	}

	const onChangeHandler = (e) => {
		
	}

	const onCancelClick = () => {
	
	}

	return (
		<form
			id="add-image-post-form"
			onSubmit={onSubmit}
			className="add-image-post-form"
		>
			{/* <h1>Upload Picture</h1> */}

			<div className={`image-input-wrapper ${uploadedImage ? "hidden" : ""}`}>
				<label htmlFor="picture">
					<PictureFrameIcon iconColorProp="#B5B5B5" />

					<span>Choose a Picture</span>
				</label>

				<input
					type="file"
					id="picture"
					name="picture"
					onChange={onChangeHandler}
					ref={inputRef}
				/>
			</div>
		
			<div className={`preview-wrapper ${!uploadedImage ? "hidden" : ""}`} >
				<img src={imagePreview} alt="preview" />
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
