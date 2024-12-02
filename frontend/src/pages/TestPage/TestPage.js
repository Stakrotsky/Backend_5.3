import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Title } from '../../components/';
import { Result, Question, Navigation } from './components';
import { fetchQuiz } from '../../api';

export const TestPage = () => {
	const [test, setTest] = useState(null);
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswers, setSelectedAnswers] = useState({});
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [finished, setFinished] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadTest = async () => {
			try {
				const data = await fetchQuiz;
				setTest(data);
			} catch (error) {
				alert('Ошибка загрузки данных теста');
			}
		};
		loadTest();
	}, []);

	const handleAnswerSelect = (questionId, answerText) => {
		setSelectedAnswers((prevAnswers) => {
			const updatedAnswers = { ...prevAnswers };

			if (!updatedAnswers[questionId]) {
				updatedAnswers[questionId] = [];
			}

			if (updatedAnswers[questionId].includes(answerText)) {
				updatedAnswers[questionId] = updatedAnswers[questionId].filter(
					(selected) => selected !== answerText,
				);
			} else {
				updatedAnswers[questionId] = [...updatedAnswers[questionId], answerText];
			}

			return updatedAnswers;
		});
	};

	const handleNextQuestion = () => {
		if (Object.keys(selectedAnswers).length > 0) {
			setCurrentQuestionIndex(currentQuestionIndex + 1);
		}
	};

	const handlePreviousQuestion = () => {
		if (currentQuestionIndex > 0) {
			setCurrentQuestionIndex(currentQuestionIndex - 1);
		}
	};

	const handleFinishTest = () => {
		let correctCount = 0;
		const questionResults = test.questions.map((question, index) => {
			const correctAnswerTexts = question.answers
				.filter((answer) => answer.isCorrect)
				.map((answer) => answer.text);

			const selectedAnswerTexts = selectedAnswers[question._id] || [];

			const isCorrect =
				correctAnswerTexts.length === selectedAnswerTexts.length &&
				correctAnswerTexts.every((answer) =>
					selectedAnswerTexts.includes(answer),
				) &&
				selectedAnswerTexts.every((answer) =>
					correctAnswerTexts.includes(answer),
				);

			if (isCorrect) {
				correctCount++;
				setCorrectAnswers(correctCount);
			}

			return {
				questionNumber: index + 1,
				isCorrect: isCorrect,
			};
		});

		const result = {
			date: new Date().toLocaleString(),
			correctAnswers: correctCount,
			totalQuestions: test.questions.length,
			questionResults: questionResults,
		};

		const history = JSON.parse(localStorage.getItem('testHistory')) || [];
		history.push(result);
		localStorage.setItem('testHistory', JSON.stringify(history));

		setFinished(true);
	};

	const handleRestartTest = () => {
		setCurrentQuestionIndex(0);
		setSelectedAnswers({});
		setCorrectAnswers(0);
		setFinished(false);

		navigate('/test');
	};

	if (!test) {
		return <div>Loading...</div>;
	}

	if (finished) {
		return (
			<Container>
				<Result
					correctAnswers={correctAnswers}
					totalQuestions={test.questions.length}
					onRestartTest={handleRestartTest}
					onNavigateHome={() => navigate('/')}
				/>
			</Container>
		);
	}

	const currentQuestion = test.questions[currentQuestionIndex];
	const isFirstQuestion = currentQuestionIndex === 0;
	const isLastQuestion = currentQuestionIndex === test.questions.length - 1;

	return (
		<Container>
			<Title>
				Вопрос {currentQuestionIndex + 1} из {test.questions.length}
			</Title>
			<Question
				question={currentQuestion}
				selectedAnswers={selectedAnswers}
				onAnswerSelect={handleAnswerSelect}
			/>
			<Navigation
				selectedAnswers={selectedAnswers}
				isFirstQuestion={isFirstQuestion}
				isLastQuestion={isLastQuestion}
				handlePreviousQuestion={handlePreviousQuestion}
				handleFinishTest={handleFinishTest}
				handleNextQuestion={handleNextQuestion}
			/>
		</Container>
	);
};
