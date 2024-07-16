import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";


import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import './SearchInput.css';

const SearchInput = (props) => {
	const [isSearchDropDownOpen, setIsSearchDropDownOpen] = useState(false);
	const [searchedText, setSearchedText] = useState("");

	const {
		className,
		onUpdate,
		dropDownOptions,
		isLoading
	} = props;

	const dropdownOptionsRef = useRef();
	const searchInputRef = useRef();

	const handleClickOutside = useCallback((event) => {
		if (dropdownOptionsRef.current && !dropdownOptionsRef.current.contains(event.target) && !searchInputRef.current.contains(event.target)) {
			setIsSearchDropDownOpen(false);
		}
	}, []);

	const openSearchDropdown = useCallback(() => {
		setIsSearchDropDownOpen(true);
	}, []);

	const closeSearchDropdown = useCallback(() => {
		setIsSearchDropDownOpen(false);
	}, []);

	const handleDropdownActions = useCallback((action) => {
		if (searchedText.length >= 2) {
			openSearchDropdown();
		}

		if (searchedText === "") {
			closeSearchDropdown();
		}
	}, [openSearchDropdown, closeSearchDropdown, searchedText]);

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);

		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [handleClickOutside]);

	useEffect(() => {
		handleDropdownActions();
	}, [searchedText, handleDropdownActions]);

	const onChange = (e) => {
		setSearchedText(e.target.value)
		onUpdate(e.target.value);
	};

	const onSearchOptionClick = () => {
		closeSearchDropdown();
		setSearchedText("");
	}

	let classes = "search-input-wrapper"

	if (className) {
		classes = `search-input-wrapper ${className}`
	}

	const dropdownOptions = dropDownOptions.length ? dropDownOptions.map((option) => (
		<Link to={`/user/${option._id}`} key={option.username} className="search-option" onClick={onSearchOptionClick}>
			{option.username}
		</Link>
	)) : "No Data";

	const dropdownContent = isLoading
		? <LoadingSpinner /> 
		: dropdownOptions;

	return (
		<div className={classes}>
			<input
				type="text"
				id="searched-text"
				name="searchedText"
				placeholder="Search"
				value={searchedText}
				onChange={onChange}
				onFocus={handleDropdownActions}
				className="search-input"
				ref={searchInputRef}
			/>

			{isSearchDropDownOpen
				? (
					<div
						className="options-wrapper"
						ref={dropdownOptionsRef}
					>
						{dropdownContent}
					</div>
				) : null
			}
		</div>
	)
}

export default SearchInput;
