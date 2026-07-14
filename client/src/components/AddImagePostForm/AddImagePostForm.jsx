import { useState } from 'react';

import Button from '../Button/Button';
import ImageInput from '../ImageInput/ImageInput';
import PictureFrameIcon from '../icons/PictureFrameIcon';

import './AddImagePostForm.css';

const AddImagePostForm = ({ addImagePostHandler }) => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [caption, setCaption] = useState('');

	const onSubmit = (e) => {
		e.preventDefault();

		addImagePostHandler(uploadedImage, caption);
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

			<textarea
				className='caption-input'
				placeholder='Write a caption...'
				value={caption}
				onChange={(e) => setCaption(e.target.value)}
			/>

			<div className='button-row'>
				<Button type='submit' label='Submit' />

				<Button type='button' label='Cancel' onClick={onCancelClick} />
			</div>
		</form>
	);
};

export default AddImagePostForm;
