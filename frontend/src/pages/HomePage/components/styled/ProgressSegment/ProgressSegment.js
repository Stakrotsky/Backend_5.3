import styled from 'styled-components';

export const ProgressSegment = styled.div`
	height: 100%;
	border-radius: 15px;
	flex-grow: 1;
	transition: background-color 0.3s ease;
	background-color: ${(props) => (props.isCorrect ? '#4caf50' : '#f44336')};
`;
