import { useState } from 'react';

import Button from '../Button/Button';
import ImageInput from '../ImageInput/ImageInput';
import PictureFrameIcon from '../icons/PictureFrameIcon';

import './AddImagePostForm.css';

const AddImagePostForm = ({ addImagePostHandler }) => {
	const [uploadedImage, setUploadedImage] = useState(null);

	const onSubmit = (e) => {
		e.preventDefault();

		addImagePostHandler(uploadedImage);
	};

	const onCancelClick = () => {
		// inputRef.current.value = null;
		// setUploadedImage(null);
		// setImagePreview(null);
	};

	return (
		<form id='add-image-post-form' onSubmit={onSubmit} className='add-image-post-form'>
			<h1>Upload Picture</h1>

			<ImageInput
				onChange={setUploadedImage}
				PlaceHolderImageProp={PictureFrameIcon}
				placeholderText='Choose a Picture'
				imageWidth={290}
				imageHeigth={320}
			/>

			<div className='button-row'>
				<Button type='submit' label='Submit' />

				<Button type='button' label='Cancel' onClick={onCancelClick} />
			</div>
		</form>
	);
};

export default AddImagePostForm;
