import { useState, useEffect, useRef, Fragment } from "react";

import PictureFrameIcon from "../icons/PictureFrame";

const ImageInput = ({ onChange }) => {
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


	const onChangeHandler = (e) => {
		setUploadedImage(e.target.files[0]);
		onChange(e.target.files[0]);
	}

	const onCancelClick = () => {
		inputRef.current.value = null;
		setUploadedImage(null);
		setImagePreview(null);
	}

	return (
		<Fragment>
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
		</Fragment>
	);
};

export default ImageInput;
