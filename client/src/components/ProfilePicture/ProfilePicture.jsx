import './ProfilePicture.css';

const ProfilePicture = (props) => {
	const { imageUrl, className } = props;

	const classNames = ['profile-picture', className].filter(Boolean).join(' ');

	if (imageUrl) {
		return <img className={classNames} src={imageUrl} alt='' />;
	}

	// Geometry is the Figma Profile Picture placeholder variant on its own 190 canvas,
	// so the viewBox rescales it to whatever size the consumer sets.
	return (
		<svg className={classNames} viewBox='0 0 190 190' aria-hidden='true' focusable='false'>
			<rect width='190' height='190' fill='var(--avatar-placeholder-disc)' />

			<circle cx='95' cy='90' r='42' fill='var(--avatar-placeholder-figure)' />

			<ellipse cx='95' cy='198' rx='63' ry='59' fill='var(--avatar-placeholder-figure)' />
		</svg>
	);
};

export default ProfilePicture;
