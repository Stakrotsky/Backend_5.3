import styled from 'styled-components';
import { Button } from '../Button/Button';

export const DangerButton = styled(Button)`
	background-color: #f44336;
	&:hover {
		background-color: #e53935;
	}
`;
