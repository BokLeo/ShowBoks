
// Information

import React, { useState } from 'react';
import { Box } from '@mui/material';

const Information = ({ iconName, text }) => {
	const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };


  const infoStyle = {
		display: 'flex',
		alignItems: 'center',
  };

  const bubbleStyle = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		// width : '40px',
		height : '40px',
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
	<Box sx={infoStyle}>
		<Box 
			sx={bubbleStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<span style={iconStyle}>{iconList[iconName]}</span>
		</Box>
		<span style={textStyle}>{text}</span>
	</Box>
  );
};

export default Information;