import React from 'react';
import { List } from '../../../../components';
import { AnswerItem, AnswerInput, QuestionContainer, QuestionText } from '../';

export const Question = ({ question, selectedAnswers, onAnswerSelect }) => {
	return (
		<QuestionContainer>
			<QuestionText>{question.text}</QuestionText>
			<List>
				{question.answers.map((answer) => (
					<AnswerItem
						key={answer.text}
						isSelected={selectedAnswers[question._id]?.includes(answer.text)}
						onClick={() => onAnswerSelect(question._id, answer.text)}
					>
						<AnswerInput
							type="checkbox"
							checked={selectedAnswers[question._id]?.includes(answer.text)}
							onChange={() => onAnswerSelect(question._id, answer.text)}
						/>
						{answer.text}
					</AnswerItem>
				))}
			</List>
		</QuestionContainer>
	);
};
