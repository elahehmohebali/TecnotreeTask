import Home from './pages/Home';
import Favorites from './pages/Favorites';

import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/favorites" element={<Favorites />} />			
		</Routes>
	);
}
export default App;
