import { useCallback, useEffect, useState } from 'react';

export const useHistory = () => {
	const [history, setHistory] = useState([]);

	const loadHistory = useCallback(() => {
		const historyData = JSON.parse(localStorage.getItem('testHistory')) || [];
		setHistory(historyData);
	}, []);

	useEffect(() => {
		loadHistory();
	}, [loadHistory]);

	return history;
};
