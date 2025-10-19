import { useState } from 'react';

import './Comment.css';

const Comment = ({ text }) => {
	const [triggerWrite, setTriggerWrite] = useState(false);

	console.log('in comment');
	return (
		<div className='comment-wrapper'>
			<div className='commenter-account-details'>
				<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />
			</div>

			<div className='comment-content'>
				<span className='commenter-username'>test username</span>

				<span className='comment-text' onClick={() => setTriggerWrite(true)}>
					{text}
				</span>
			</div>

			{/* <div className='comment-replies-wrapper'>test text</div> */}
		</div>
	);
};

export default Comment;
