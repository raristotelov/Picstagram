import CloseIcon from '../icons/Close';

import './Popup.css';

// The title lives here rather than in each form because the two breakpoints place it
// differently: centred inside the popup on desktop, in a top bar beside the close
// button on mobile, where the popup covers the whole screen.
const Popup = ({ title, onClosePopupClick, children }) => {
	return (
		<div className='popup-container' onMouseDown={onClosePopupClick}>
			<div className='popup-body' onMouseDown={(e) => e.stopPropagation()}>
				<button type='button' className='popup-close' onClick={onClosePopupClick} aria-label='Close'>
					<CloseIcon iconColorProp='currentColor' />
				</button>

				{title ? <h2 className='popup-title'>{title}</h2> : null}

				{children}
			</div>
		</div>
	);
};

export default Popup;
