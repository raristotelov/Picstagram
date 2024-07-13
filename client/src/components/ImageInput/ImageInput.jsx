import { useState, useEffect, useRef, Fragment } from "react";

import PictureFrameIcon from "../icons/PictureFrameIcon";

import "./ImageInput.css"

const defaultImageWidth = 290;
const defaultImageHeight = 320;
const defaultIconWidth = 90;
const defaultIconHeight = 90;
const defaultFontSize = 22;

const ImageInput = (props) => {
	const [uploadedImage, setUploadedImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const inputRef = useRef(null);

	const {
		onChange,
		initialValue,
		placeholderText,
		isRoundImage,
		PlaceHolderImageProp,
		imageWidthProp,
		imageHeightProp,
		iconWidthProp,
		iconHeightProp,
		fontSizeProp
	} = props;

	useEffect(() => {
		if (initialValue) {
			setUploadedImage(initialValue);
		}
	}, [initialValue]);

	useEffect(() => {
        if (!uploadedImage) {
            setImagePreview(null);
            return;
        }

		if (uploadedImage === initialValue) {
			setImagePreview(uploadedImage);
			return;
		}

		const objectUrl = URL.createObjectURL(uploadedImage);
		setImagePreview(objectUrl);

		// free memory when ever this component is unmounted
		return () => URL.revokeObjectURL(objectUrl);
    }, [uploadedImage, initialValue]);

	const onChangeHandler = (e) => {
		setUploadedImage(e.target.files[0]);
		onChange(e.target.files[0]);
	}

	const getImageInputWrapperClasses = () => {
		let imageInputWrapperClasses = "image-input-wrapper";

		if (isRoundImage) {
			imageInputWrapperClasses = imageInputWrapperClasses.concat(" round-image");
		}
	
		if (uploadedImage) {
			imageInputWrapperClasses = imageInputWrapperClasses.concat(" hidden");
		}

		return imageInputWrapperClasses;
	}

	const getPreviewWrapperClasses = () => {
		let previewWrapperClasses = "preview-wrapper";

		if (isRoundImage) {
			previewWrapperClasses = previewWrapperClasses.concat(" round-image");
		}
	
		if (!uploadedImage) {
			previewWrapperClasses = previewWrapperClasses.concat(" hidden");
		}

		return previewWrapperClasses;
	}

	const PlaceHolderImage = PlaceHolderImageProp || PictureFrameIcon;
	const imageWidth = imageWidthProp || defaultImageWidth;
	const imageHeigth = imageHeightProp || defaultImageHeight;
	const iconWidth = iconWidthProp || defaultIconWidth;
	const iconHeight = iconHeightProp || defaultIconHeight;
	const fontSize = fontSizeProp || defaultFontSize;

	return (
		<Fragment>
			<div className={getImageInputWrapperClasses()} style={{width: `${imageWidth}px`, height: `${imageHeigth}px`}}>
				<label htmlFor="picture">
					<PlaceHolderImage
						iconColorProp="#B5B5B5"
						iconWidthProp={iconWidth}
						iconHeightProp={iconHeight}
					/>

					{placeholderText 
						? (
							<span style={{fontSize: `${fontSize}px`}}>{placeholderText}</span>
						) : null
					}
				</label>

				<input
					type="file"
					id="picture"
					name="picture"
					onChange={onChangeHandler}
					ref={inputRef}
				/>
			</div>

			<div className={getPreviewWrapperClasses()} style={{width: `${imageWidth}px`, height: `${imageHeigth}px`}}>
				<img src={imagePreview} alt="preview" width={imageWidth} height={imageHeigth} />

				<button
					onClick={(e) => {
						e.preventDefault();
						inputRef.current.click()
					}}
					className="image-change-button" style={{width: `${imageWidth}px`, height: `${imageHeigth}px`}}
				>
					Change
				</button>
			</div>
		</Fragment>
	);
};

export default ImageInput;
