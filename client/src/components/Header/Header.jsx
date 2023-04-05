import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import './Header.css';

const MainHeader = ({ loggedInUser, logoutHandler }) => {
	

	const loggedUserLinks = (
		<ul>
			<li>
				<Link to="" >Search</Link>
			</li>

			<li>
				<Link to="" >What's popular?</Link>

			</li>

			<li>
				<Link to="" >Profile</Link>
			</li>


			<li>
				<Link
					to=""
					onClick={logoutHandler}
				>
					Log out
				</Link>
			</li>
		</ul>
	);

	const guestUserLinks = (
		<ul>
			<li>
				<Link to="/login" >Login</Link>
			</li>

			<li>
				<Link to="/sign-up" >Sign up</Link>

			</li>
		</ul>
	);
	
    return (
        <div className="header-wrapper">
			<header className="header">

               <Logo />

				<nav className="navbar">
					{loggedInUser ? loggedUserLinks : guestUserLinks}
				</nav>
			</header>
        </div>
    );
};

export default MainHeader;
