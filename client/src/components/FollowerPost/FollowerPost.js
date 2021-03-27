import './FollowerPost.scss';

const FollowerPost = () => {
    return (
        <div className="post-wrapper">
            <div className="follower-props">
                <h4>NAME</h4>
            </div>
            <div>
                <img src="http://webmeup.com/upload/blog/lead-image-105.png" />
            </div>
            <div className="actions-wrapper">
                <div>Heart</div>
                <div>Comment</div>
                <div>Share</div>
            </div>
            <div className="comments-wrapper">
                <div>Comment1</div>
                <div>Comment2</div>
                <div>Comment3</div>
            </div>
            <div className="write-comment-wrapper">
                <div>
                    Write comment Here
                </div>
            </div>
        </div>
    );
};

export default FollowerPost;
