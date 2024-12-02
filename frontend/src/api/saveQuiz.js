export const saveQuiz = async (quizData) => {
	try {
		const response = await fetch('/api/quiz', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(quizData),
		});
		if (!response.ok) throw new Error('Ошибка сохранения данных');
		alert('Обновление успешно!');
	} catch (error) {
		console.error('Ошибка сохранения:', error);
	}
};
