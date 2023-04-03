import { Link } from "react-router-dom";

import './Header.css';

const MainHeader = () => {
    return (
        <div className="header-wrapper">
			<header className="header">

                <span className="logo">Picstagram</span>

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
