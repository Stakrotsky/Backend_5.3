import styled from 'styled-components';

export const Button = styled.button`
	padding: 10px 20px;
	background-color: #4caf50;
	color: #fff;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 16px;
	transition: background-color 0.3s ease;

	&:hover {
		background-color: #3b8150;
	}

	&:disabled {
		background-color: #ddd;
		cursor: not-allowed;
	}
`;
