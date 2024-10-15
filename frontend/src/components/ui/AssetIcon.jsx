import React from 'react';
import PropTypes from 'prop-types';

import SunIcon from '../../assets/icons/weather/sun.svg';
import RainIcon from '../../assets/icons/weather/rain.svg';
import SnowIcon from '../../assets/icons/weather/snow.svg';
import CloudIcon from '../../assets/icons/weather/cloud.svg';
import CloudSunIcon from '../../assets/icons/weather/cloud-sun.svg';
import RainSnowIcon from '../../assets/icons/weather/rain-snow.svg';

// BUG 10.14 import할때 resolve로 설정한 경로가 안먹히는 상황 발생
/** 
 * - 원인 못찾음....
 * - 다 해봣는데 안됨....
 * - 추가 가능성 rules에 추가되어있는 loader가 영향을 줄수도 있음 -> 아닌듯
 * 
 * 10.15 재시도 해봤지만 안됨
 *	- 재시도 1. resolve에 alias 추가 -> 실패
 *	- 재시도 2. jsconfig.json에 path에 영향이 있을것으로 보아 추가해봄 -> 실패
 * */ 

/*

resolve: {
		alias: {  
			icons: path.resolve(__dirname, 'src/assets'),
 */
// import Nav from 'components/utils/Nav';
// C:\bok\Dev\Project\ShowBoks\frontend\src\assets\sun.svg
// lkasndlkasndlkasn ::::  C:\bok\Dev\Project\ShowBoks\frontend\src\assets\icons
// import sunIcon from '@icons/weather/sun.svg';
// import sun2 from 'i'

const iconMap = {
	sun: SunIcon,
	rain: RainIcon,
	snow: SnowIcon,
	cloud: CloudIcon,
	'cloud-sun': CloudSunIcon,
	'rain-snow': RainSnowIcon,
};

const AssetIcon = ({ iconName }) => {
	const icon = iconMap[iconName] || SunIcon;

	return <img src={icon} alt={iconName} />;
};

AssetIcon.propTypes = {
  iconName: PropTypes.string,
};

export default AssetIcon;
