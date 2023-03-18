import { Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import Header from './components/Header/Header';
import FeedView from './components/FeedView/FeedView';

import './App.css';

function App() {
    return (
		<Fragment>
			<Header />

			<Routes>
				<Route path="/main" element={<FeedView />} />
			</Routes>
		</Fragment>
    );
}

export default App;
