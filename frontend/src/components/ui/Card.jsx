import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
	width: 100%;
	height: 100%;
	perspective: 1100px;
	transition: .8s;
	transform-style: preserve-3d;
	position: relative;
	

	.front{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 20px;
		backface-visibility: hidden;
	}
	.back{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		padding: 20px;
		backface-visibility: hidden;
		transform: rotateY(180deg);
	}
	&.flipped{
		cursor: auto;
		transform: rotateY(180deg);
	}
	&:hover{
		cursor: pointer;
		transform: rotateY(180deg);
	}
`;




const Card = ({ frontContent, backContent, isFlipped }) => {

	return (
    <StyledCard className={`card-wrap ${isFlipped ? 'flipped' : ''}`}>
			{frontContent}
			{backContent}
		</StyledCard>
	);
};

export default Card;