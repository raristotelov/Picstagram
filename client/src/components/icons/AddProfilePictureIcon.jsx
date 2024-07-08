const AddProfilePictureIcon = ({ iconColorProp, iconWidthProp, iconHeightProp }) => {
	const iconColor = iconColorProp || "#4B4B4B";
	const width = iconWidthProp || 24;
	const height = iconHeightProp || 24;

	return (
		<svg
			fill="none"
			height={`${width}px`}
			width={`${height}px`}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				stroke={iconColor}
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
			>
				<circle
					cx="9"
					cy="7"
					r="4"
				/>

				<path
					d="m2 21v-4c0-1.1046.89543-2 2-2h10c1.1046 0 2 .8954 2 2v4"
				/>

				<path
					d="m19 8v6m-3-3h6"
				/>
			</g>
		</svg>
	)
}

export default AddProfilePictureIcon;
