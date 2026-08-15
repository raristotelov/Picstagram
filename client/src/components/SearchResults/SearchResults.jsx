import { Link } from 'react-router-dom';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './SearchResults.css';

const SearchResults = ({ results, isLoading, onResultClick }) => {
	if (isLoading) {
		return (
			<div className='search-results'>
				<LoadingSpinner />
			</div>
		);
	}

	if (!results.length) {
		return (
			<div className='search-results'>
				<p className='search-results-empty'>No users found</p>
			</div>
		);
	}

	return (
		<div className='search-results'>
			{results.map((user) => (
				<Link to={`/user/${user._id}`} key={user._id} className='search-result' onClick={onResultClick}>
					<span className='search-result-avatar' />

					<span className='search-result-text'>
						<span className='search-result-username'>{user.username}</span>

						<span className='search-result-followers'>{`${user.followers?.length || 0} followers`}</span>
					</span>
				</Link>
			))}
		</div>
	);
};

export default SearchResults;
