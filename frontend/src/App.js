import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { EditPage, HomePage, TestPage } from './pages';

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/test" element={<TestPage />} />
			<Route path="/edit" element={<EditPage />} />
		</Routes>
	);
};
