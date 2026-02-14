import './Button.css';

const Button = ({ label, ...props }) => {
	return (
		<button className='button-classname' {...props}>
			{label}
		</button>
	);
};

export default Button;
