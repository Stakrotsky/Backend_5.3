import React from 'react';
import { QuestionItem, AnswerItem, Input, Button, DangerButton, ToggleButton } from '../';

export const QuestionList = ({
	questions,
	isCollapsed,
	onToggleCollapse,
	onQuestionChange,
	onAnswerChange,
	onAddAnswer,
	onDeleteAnswer,
	onDeleteQuestion,
	onCorrectAnswerChange,
}) => {
	return (
		<div>
			{questions.map((question, questionIndex) => (
				<QuestionItem key={questionIndex}>
					<ToggleButton onClick={() => onToggleCollapse(questionIndex)}>
						{isCollapsed[questionIndex] ? 'Свернуть' : 'Развернуть'}
					</ToggleButton>
					{!isCollapsed[questionIndex] && (
						<span>
							<strong>Вопрос:</strong> {question.text}
						</span>
					)}
					{isCollapsed[questionIndex] && (
						<>
							<Input
								type="text"
								value={question.text}
								onChange={(e) =>
									onQuestionChange(questionIndex, e.target.value)
								}
								placeholder="Введите текст вопроса"
							/>
							<div>
								{question.answers.map((answer, answerIndex) => (
									<AnswerItem key={answerIndex}>
										<input
											type="checkbox"
											checked={answer.isCorrect}
											onChange={() =>
												onCorrectAnswerChange(
													questionIndex,
													answerIndex,
												)
											}
										/>
										<Input
											type="text"
											value={answer.text}
											onChange={(e) =>
												onAnswerChange(
													questionIndex,
													answerIndex,
													e.target.value,
												)
											}
											placeholder="Введите текст ответа"
										/>
										<DangerButton
											onClick={() =>
												onDeleteAnswer(questionIndex, answerIndex)
											}
										>
											Удалить ответ
										</DangerButton>
									</AnswerItem>
								))}
							</div>
							<Button onClick={() => onAddAnswer(questionIndex)}>
								Добавить ответ
							</Button>
							<DangerButton onClick={() => onDeleteQuestion(questionIndex)}>
								Удалить вопрос
							</DangerButton>
						</>
					)}
				</QuestionItem>
			))}
		</div>
	);
};
