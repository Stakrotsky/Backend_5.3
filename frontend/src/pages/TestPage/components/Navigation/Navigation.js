import React from 'react';
import { ButtonGroup } from '../../../../components';
import { Button } from '../styled/Button/Button';

export const Navigation = ({
	selectedAnswers,
	isFirstQuestion,
	isLastQuestion,
	handlePreviousQuestion,
	handleFinishTest,
	handleNextQuestion,
}) => {
	return (
		<ButtonGroup>
			<Button disabled={isFirstQuestion} onClick={handlePreviousQuestion}>
				Предыдущий вопрос
			</Button>

			<Button
				disabled={Object.keys(selectedAnswers).length === 0}
				onClick={isLastQuestion ? handleFinishTest : handleNextQuestion}
			>
				{isLastQuestion ? 'Закончить тест' : 'Следующий вопрос'}
			</Button>
		</ButtonGroup>
	);
};
