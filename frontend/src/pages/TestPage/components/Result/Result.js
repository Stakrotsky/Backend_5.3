import React from 'react';
import { ButtonGroup } from '../../../../components/';
import { ResultContainer, ResultDetails, ResultText, Button } from '../';

export const Result = ({
	correctAnswers,
	totalQuestions,
	onRestartTest,
	onNavigateHome,
}) => (
	<ResultContainer>
		<ResultText>Правильных ответов:</ResultText>
		<ResultDetails>
			<strong>
				{correctAnswers}/{totalQuestions}
			</strong>
		</ResultDetails>
		<ButtonGroup>
			<Button onClick={onNavigateHome}>На главную</Button>
			<Button onClick={onRestartTest}>Пройти ещё раз</Button>
		</ButtonGroup>
	</ResultContainer>
);
