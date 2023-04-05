import './Button.css';

const Button = ({ label }) => {
	return (
		<button
			className="submit-btn"
			type="submit"
		>
			{label}
		</button>
	)
}

export default Button;
