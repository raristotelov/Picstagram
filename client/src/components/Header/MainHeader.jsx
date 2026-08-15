import { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';

import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { getUsersProfileData } from '../../services/userService';

import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import AccountMenu from '../AccountMenu/AccountMenu';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import ArrowDown from '../icons/ArrowDown';
import FlameIcon from '../icons/Flame';
import HouseIcon from '../icons/House';

import './MainHeader.css';

const MainHeader = ({ logoutHandler }) => {
	const [searchWord, setSearchWord] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

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
				Log in
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

					<div className='search-component-wrapper'>
						<SearchInput onUpdate={setSearchWord} dropDownOptions={searchResults} isLoading={isLoading} />
					</div>
				</div>

				<div className='navbar-logged-user-container'>
					<nav className='navbar'>{loggedInUser ? loggedUserLinks : guestUserLinks}</nav>

					{loggedInUser ? (
						<div className='account-menu-anchor'>
							<button
								type='button'
								className='logged-user-avatar'
								onClick={() => setIsAccountMenuOpen((state) => !state)}
								aria-expanded={isAccountMenuOpen}
								aria-haspopup='menu'
							>
								<ProfilePicture imageUrl={loggedInUser.profilePicture?.imageUrl} />

								<span>{loggedInUser.username}</span>

								<ArrowDown iconColorProp='currentColor' />
							</button>

							<AccountMenu isOpen={isAccountMenuOpen} onClose={() => setIsAccountMenuOpen(false)} logoutHandler={logoutHandler} />
						</div>
					) : null}
				</div>
			</header>
		</div>
	);
};

export default MainHeader;
