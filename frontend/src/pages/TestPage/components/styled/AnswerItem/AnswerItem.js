import styled from 'styled-components';

export const AnswerItem = styled.li`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	background-color: ${(props) => (props.isSelected ? '#e0e0e0' : 'transparent')};
	padding: 10px;
	border-radius: 5px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #f1f1f1;
	}
`;
