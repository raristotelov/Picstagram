const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// Unsigned upload straight from the browser to Cloudinary.
// Returns the shape the server expects: { imageIdentifier, imageUrl }.
export const uploadImageToCloudinary = async (imageFile) => {
	const formData = new FormData();

	formData.append('file', imageFile);
	formData.append('upload_preset', uploadPreset);

	const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
		method: 'POST',
		body: formData,
	});

	if (!response.ok) {
		throw new Error('Something went wrong while uploading the image to Cloudinary.');
	}

	const result = await response.json();

	return {
		imageIdentifier: result.public_id,
		imageUrl: result.secure_url,
	};
};
