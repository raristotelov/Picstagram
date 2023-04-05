import { Link } from "react-router-dom";

import Logo from "../Logo/Logo";

import './Header.css';

const MainHeader = () => {
    return (
        <div className="header-wrapper">
			<header className="header">

               <Logo />

				<nav className="navbar">
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
					</ul>
				</nav>
			</header>
        </div>
    );
};

export default MainHeader;
