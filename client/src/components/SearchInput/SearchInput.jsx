import { useState, useEffect } from 'react';

import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

import './SearchInput.css';

const SearchInput = ({ className }) => {
	const [searchedText, setSearchedText] = useState('');
	const [displayOptions, setDisplayOptions] = useState(false);

	useEffect(() => {
		if (searchedText) {
			setDisplayOptions(true);
		} else {
			setDisplayOptions(false);
		}
	}, [searchedText]);


	const onSearch = (e) => {
		setSearchedText(e.target.value)
	};

	let classes = 'search-input-wrapper'

	if (className) {
		classes = `search-input-wrapper ${className}`
	}

	return (
		<div className={classes}>
			<input
				type='text'
				id='searched-text'
				name='searchedText'
				placeholder='Search'
				value={searchedText}
				onChange={onSearch}
				className='search-input'
			/>

			{displayOptions
				? (
					<div className='options-wrapper'>
						<div className='option'>
							here
						</div>
		
						<div className='option'>
							Here 2
						</div>
		
						<div className='option'>
							here 3
						</div>
					</div>
				)
				: null
			}
		</div>
	)
}

export default SearchInput;
