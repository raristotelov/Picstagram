import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { getUsersProfileData } from '../../services/userService';

import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import LogOut from '../icons/LogOut';
import FlameIcon from '../icons/Flame';
import HouseIcon from '../icons/House';

import './MainHeader.css';

const MainHeader = ({ logoutHandler }) => {
	const [searchWord, setSearchWord] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const location = useLocation();
	const currentPath = location.pathname;

	const { jwtToken, loggedInUser } = useContext(LoggedInUserContext);

	useEffect(() => {
		if (searchWord.length >= 2) {
			setIsLoading(true);

			getUsersProfileData({ searchWord, jwtToken })
				.then((result) => {
					setSearchResults(result);
					setIsLoading(false);
				})
				.catch(() => {
					setIsLoading(false);
					console.log('something went wrong while trying to fetch user data');
				});
		}
	}, [jwtToken, searchWord]);

	const loggedUserLinks = (
		<div className='navigation-links'>
			<Link to='/' title='Feed' className={`navigation-item-icon ${currentPath === '/user-feed' ? 'navigation-item-active' : ''}`}>
				<HouseIcon iconColorProp={'#4b4b4b'} />

				<span>Feed</span>
			</Link>

			<Link
				to='/popular-posts'
				title='Popular'
				className={`navigation-item-icon ${currentPath === '/popular-posts' ? 'navigation-item-active' : ''}`}
			>
				<FlameIcon iconColorProp={'#4b4b4b'} />

				<span>Popular</span>
			</Link>
		</div>
	);

	const guestUserLinks = (
		<div className='navigation-links'>
			<Link to='/log-in' className={`navigation-item-text ${currentPath === '/log-in' ? 'navigation-item-active' : ''}`}>
				Log In
			</Link>

			<Link to='/sign-up' className={`navigation-item-text ${currentPath === '/sign-up' ? 'navigation-item-active' : ''}`}>
				Sign up
			</Link>
		</div>
	);

	return (
		<div className='header-wrapper'>
			<header className='header'>
				<div className='logo-search-container'>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Logo />
					</Link>

					{loggedInUser && (
						<div className='search-component-wrapper'>
							<SearchInput onUpdate={setSearchWord} dropDownOptions={searchResults} isLoading={isLoading} />
						</div>
					)}
				</div>

				<div className='navbar-logged-user-container'>
					<nav className='navbar'>{loggedInUser ? loggedUserLinks : guestUserLinks}</nav>

					{loggedInUser ? (
						<Link to={`/user/${loggedInUser._id}`} className='logged-user-avatar'>
							<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />

							<span>{loggedInUser.username}</span>
						</Link>
					) : null}

					<div className='logged-user-options'>
						<button onClick={logoutHandler}>
							<LogOut />
						</button>
					</div>
				</div>
			</header>
		</div>
	);
};

export default MainHeader;
