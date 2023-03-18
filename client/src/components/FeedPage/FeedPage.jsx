import Header from '../Header/Header';
import FollowerPost from '../FollowerPost/FollowerPost';

import './FeedPage.css';

const Main = () => {
	console.log("main");
	
    return (
        <div>
            <Header />

            <div className="posts-wrapper">
                <FollowerPost />
                <FollowerPost />
                <FollowerPost />

            </div>
        </div>
    );
};

export default Main;
