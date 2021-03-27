import MainHeader from '../MainHeader';
import FollowerPost from '../FollowerPost';
import './Main.scss';

const Main = () => {
    return (
        <div>
            <MainHeader />
            <div className="posts-wrapper">
                <FollowerPost />
                <FollowerPost />
                <FollowerPost />

            </div>
        </div>
    );
};

export default Main;
