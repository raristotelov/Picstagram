import { useState, useEffect, useRef } from "react";

import Button from "../Button/Button";
import PictureFrameIcon from "../icons/PictureFrame";

import "./AddImagePostForm.css"

const AddImagePostForm = ({ addImagePostHandler }) => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const inputRef = useRef(null);

	useEffect(() => {
        if (!uploadedImage) {
            setImagePreview(undefined);
            return
        }

        const objectUrl = URL.createObjectURL(uploadedImage);
        setImagePreview(objectUrl);

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedImage]);

	const onSubmit = (e) => {
		e.preventDefault();

		addImagePostHandler(uploadedImage);
	}

	const onChangeHandler = (e) => {
		setUploadedImage(e.target.files[0]);
	}

	const onCancelClick = () => {
		inputRef.current.value = null;
		setUploadedImage(null);
		setImagePreview(null);
	}

	return (
		<form
			id="add-image-post-form"
			onSubmit={onSubmit}
			className="add-image-post-form"
		>
			<h1>Upload Picture</h1>

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
	);
};

export default AddImagePostForm;
