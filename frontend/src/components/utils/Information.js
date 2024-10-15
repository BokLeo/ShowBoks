
// Information

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const Information = (props) => {
	const [hover, setHover] = useState(false);
	
  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

	const getFlexDirection = (direction) => {
    if (direction === 'left') {
      return 'row-reverse';
    } else if (direction === 'right') {
      return 'row';
    } else if (direction === 'top') {
      return 'column-reverse';
    } else if (direction === 'bottom') {
      return 'column';
    } else {
      return 'row';
    }
  };

  const infoStyle = {
		display: 'flex',
		alignItems: "center",
		flexDirection: getFlexDirection(props.direction),
		fontSize: "1rem"
  };

  const bubbleStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		padding: '4px',
		'&:hover': {
			cursor: 'pointer',
		},
  };

  const iconStyle = {
		
	};

	const iconList = {
		i: "ℹ️",
	};
	const textStyle = {
    marginLeft: '4px',
    display: hover ? 'block' : 'none',
		fontSize: '0.875rem',
		fontWeight: 'normal',
  };




  return (
	<Box sx={infoStyle} style={props.style}>
		<Box 
			sx={bubbleStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<span style={iconStyle}>{iconList[props.iconName]}</span>
		</Box>
		<span style={textStyle}>{props.text}</span>
	</Box>
  );
};

Information.propTypes = {
  iconName: PropTypes.string,
	text: PropTypes.string,
	style: PropTypes.object,
	direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
};

export default Information;