import CloseIcon from '../icons/Close';

import './Popup.css';

const Popup = ({ onClosePopupClick, children }) => {
	return (
		<div className='popup-container' onMouseDown={onClosePopupClick}>
			<div className='popup-body' onMouseDown={(e) => e.stopPropagation()}>
				<div className='close-btn-wrapper'>
					<button onClick={onClosePopupClick}>
						<CloseIcon iconColorProp='#B5B5B5' />
					</button>
				</div>

				{children}
			</div>
		</div>
	);
}

export default Popup;
