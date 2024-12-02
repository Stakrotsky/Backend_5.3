import { HistoryItem, ProgressBar, ProgressSegment } from '../';

export const TestHistoryItem = ({ item }) => {
	return (
		<HistoryItem>
			<div>
				<strong>Дата прохождения:</strong> {item.date}
			</div>
			<div>
				<strong>Верных ответов:</strong> {item.correctAnswers} /{' '}
				{item.totalQuestions}
			</div>
			<ProgressBar>
				{item.questionResults.map((result, index) => (
					<ProgressSegment key={index} isCorrect={result.isCorrect} />
				))}
			</ProgressBar>
		</HistoryItem>
	);
};
