import React, { useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #333333;
  border: none;
	border-radius: 4px;
	opacity: 0.3;
  color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 0.825rem;
  margin: 4px 2px;
  cursor: pointer;
  transition-duration: 0.4s;
	
  &:hover {
		opacity: 1;
		background-color: #007bff;
    color: #fff;
  }

	&.active{
		opacity: 0.3;
		background-color: #007bff;
		color: #fff;

		&:hover {
			opacity: 1;
			background-color: #333333;
			color: #fff;
		}
	}
`;

const ToggleBtn = ({ isActive, onClick }) => {
  return (
    <StyledButton className={`toggle-btn ${isActive ? 'active' : ''}`} onClick={onClick}>
      {isActive ? '비활성화' : '활성화'}
    </StyledButton>
  );
};

export default ToggleBtn;