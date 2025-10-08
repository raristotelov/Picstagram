import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import LoggedInUserContext from '../../contexts/LoggedInUserContext';
import { getUsersProfileData } from '../../services/userService';

import Logo from '../Logo/Logo';
import SearchInput from '../SearchInput/SearchInput';
import PopularPosts from '../icons/PopularPosts';
import LogOut from '../icons/LogOut';

import './MainHeader.css';

const MainHeader = ({ logoutHandler }) => {
	const [searchWord, setSearchWord] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const { jwtToken, loggedInUser } = useContext(LoggedInUserContext);

	useEffect(() => {
		if (searchWord.length >= 2) {
			setIsLoading(true);

			getUsersProfileData({ searchWord, jwtToken })
				.then((result) => {
					setSearchResults(result);
					setIsLoading(false);
				}).catch(() => {
					setIsLoading(false);
					console.log('something went wrong while trying to fetch user data');
				})
		}
	}, [jwtToken, searchWord]);

	const loggedUserLinks = (
		<ul>
			<li>
				<Link to='/popular-posts' >
					<PopularPosts iconColorProp={'#EEEEEE'} />
				</Link>
			</li>
		</ul>
	);

	const guestUserLinks = (
		<ul>
			<li>
				<Link to='/login' >Login</Link>
			</li>

			<li>
				<Link to='/sign-up' >Sign up</Link>
			</li>
		</ul>
	);

    return (
        <div className='header-wrapper'>
			<header className='header'>
				<div className='header-logo-wrapper'>
					<Link to='/'>
						<Logo />
					</Link>
				</div>

				
				<div className='search-component-wrapper'>
					<SearchInput
						onUpdate={setSearchWord}
						dropDownOptions={searchResults}
						isLoading={isLoading}
						className={'search-component-header-class'}
					/>
				</div>

				<div className='navbar-logged-user-container'>
					<nav className='navbar'>
						{loggedInUser ? loggedUserLinks : guestUserLinks}
					</nav>

					{loggedInUser 
						? (
							<Link to={`/user/${loggedInUser._id}`} className='logged-user-avatar'>
								<img src='https://i.pinimg.com/736x/30/df/1c/30df1cb8981338d42ed2722ab74cb51e.jpg' alt='post-img' />

								<h4>{loggedInUser.username}</h4>
							</Link>
						) : null
					}

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
