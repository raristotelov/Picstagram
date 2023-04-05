import { useState } from "react";

import Comment from "../Comment/Comment";
import LikeIcon from "../icons/Like";
import CommentIcon from "../icons/Comment";
import ArrowUpIcon from "../icons/ArrowUp";
import ArrowDownIcon from "../icons/ArrowDown";


import './UserPost.css';

const FollowerPost = () => {
	const [toggledCommentsSection, setToggledCommentsSection] = useState(false);

	const toggleCommentsSection = () => {
		console.log("in");
		setToggledCommentsSection((state) => !state);
	}

    return (
        <div className="post-wrapper">
            <div className="account-details">
				<img src="https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg" alt="post-img" />

                <h4>harold.memara</h4>
            </div>

            <div className='post-image-wrapper'>
                <img src="https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg" alt="post-img" />
            </div>

            <div className="like-action-wrapper">
				<span>80 likes</span>

				<LikeIcon />
            </div>

			<div className="comments-section-toggle-wrapper">
				<div className="comments-count-section">
					<CommentIcon />

					<span>5 comments</span>
				</div>
				
				<button
					className="toggle-comments-btn"
					onClick={toggleCommentsSection}
				>
					{toggledCommentsSection ? <ArrowUpIcon /> : <ArrowDownIcon />}
				</button>
            </div>

			{toggledCommentsSection
				? (
					<div className="comments-wrapper">
						<Comment />
					</div>
				) : null
			}
        </div>
    );
};

export default FollowerPost;
