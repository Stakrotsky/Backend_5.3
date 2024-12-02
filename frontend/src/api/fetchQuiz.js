export const fetchQuiz = async () => {
	try {
		const response = await fetch('/api/quiz');
		if (!response.ok) throw new Error('Ошибка загрузки данных');
		return await response.json();
	} catch (error) {
		console.error('Ошибка получения теста:', error);
		throw error;
	}
};
