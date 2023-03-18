import './FollowerPost.css';

const FollowerPost = () => {
    return (
        <div className="post-wrapper">
            <div className="follower-props">
                <h4>NAME</h4>
            </div>
            <div>
                <img src="" alt="post-img" />
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
