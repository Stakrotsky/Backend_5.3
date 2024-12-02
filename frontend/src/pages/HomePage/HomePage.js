import { Link } from 'react-router-dom';
import { Container, Title, ButtonGroup, List } from '../../components/';
import { Subtitle, Button, NoHistoryMessage } from './components';
import { useHistory } from '../../hooks';
import { TestHistoryItem } from './components/TestHistoryItem/TestHistoryItem';

export const HomePage = () => {
	const history = useHistory();

	return (
		<Container>
			<Title>Quiz v0.1</Title>
			<ButtonGroup>
				<Link to="/test">
					<Button>Запустить тест</Button>
				</Link>
				<Link to="/edit">
					<Button>Редактировать тест</Button>
				</Link>
			</ButtonGroup>
			<Subtitle>История прохождений:</Subtitle>
			<List>
				{history.length > 0 ? (
					history.map((item) => (
						<TestHistoryItem key={item.id || item.date} item={item} />
					))
				) : (
					<NoHistoryMessage>История прохождений отсутствует</NoHistoryMessage>
				)}
			</List>
		</Container>
	);
};
