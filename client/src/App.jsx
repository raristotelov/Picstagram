import { Routes, Route } from 'react-router-dom';

import Main from './components/FeedPage/FeedPage';

import './App.css';

function App() {
    return (
		<Routes>
			<Route path="/main" element={<Main />} />
		</Routes>
    );
}

export default App;
