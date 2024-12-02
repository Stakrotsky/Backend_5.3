import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, ButtonGroup } from '../../components/';
import { Button, QuestionList } from './components';
import { fetchQuiz, saveQuiz } from '../../api';

export const EditPage = () => {
	const [test, setTest] = useState(null);
	const [isCollapsed, setIsCollapsed] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const loadTest = async () => {
			try {
				const data = await fetchQuiz();
				setTest(data);
				initializeCollapseState(data.questions);
			} catch (error) {
				alert('Ошибка загрузки данных теста');
			}
		};
		loadTest();
	}, []);

	const initializeCollapseState = (questions) => {
		const initialCollapsed = questions.reduce((acc, _, index) => {
			acc[index] = false;
			return acc;
		}, {});
		setIsCollapsed(initialCollapsed);
	};

	const handleSave = () => {
		if (test) {
			saveQuiz(test).then(() => navigate('/'));
		}
	};

	const handleAddQuestion = () => {
		const newQuestion = {
			text: '',
			answers: [{ text: '', isCorrect: false }],
		};
		setTest({ ...test, questions: [...test.questions, newQuestion] });
		setIsCollapsed((prevState) => ({
			...prevState,
			[test.questions.length]: true,
		}));
	};

	const handleDeleteQuestion = (index) => {
		const updatedQuestions = test.questions.filter((_, i) => i !== index);
		setTest({ ...test, questions: updatedQuestions });

		const updatedCollapsedState = { ...isCollapsed };
		delete updatedCollapsedState[index];
		setIsCollapsed(updatedCollapsedState);
	};

	const handleAddAnswer = (questionIndex) => {
		const updatedTest = { ...test };
		updatedTest.questions[questionIndex].answers.push({ text: '', isCorrect: false });
		setTest(updatedTest);
	};

	const handleDeleteAnswer = (questionIndex, answerIndex) => {
		const updatedTest = { ...test };
		updatedTest.questions[questionIndex].answers.splice(answerIndex, 1);
		setTest(updatedTest);
	};

	const handleAnswerChange = (questionIndex, answerIndex, value) => {
		const updatedTest = { ...test };
		updatedTest.questions[questionIndex].answers[answerIndex].text = value;
		setTest(updatedTest);
	};

	const handleQuestionChange = (index, value) => {
		const updatedTest = { ...test };
		updatedTest.questions[index].text = value;

		setTest(updatedTest);
	};

	const handleCorrectAnswerChange = (questionIndex, answerIndex) => {
		const updatedTest = { ...test };
		updatedTest.questions[questionIndex].answers[answerIndex].isCorrect =
			!updatedTest.questions[questionIndex].answers[answerIndex].isCorrect;
		setTest(updatedTest);
	};

	const handleToggleCollapse = (questionId) => {
		setIsCollapsed((prevState) => ({
			...prevState,
			[questionId]: !prevState[questionId],
		}));
	};

	if (!test) {
		return <div>Loading...</div>;
	}

	return (
		<Container>
			<QuestionList
				questions={test.questions}
				isCollapsed={isCollapsed}
				onToggleCollapse={handleToggleCollapse}
				onQuestionChange={handleQuestionChange}
				onAnswerChange={handleAnswerChange}
				onAddAnswer={handleAddAnswer}
				onDeleteAnswer={handleDeleteAnswer}
				onDeleteQuestion={handleDeleteQuestion}
				onCorrectAnswerChange={handleCorrectAnswerChange}
			/>
			<Button onClick={handleAddQuestion}>Добавить вопрос</Button>
			<ButtonGroup>
				<Button onClick={handleSave}>Сохранить</Button>
				<Button onClick={() => navigate('/')}>Отмена</Button>
			</ButtonGroup>
		</Container>
	);
};
