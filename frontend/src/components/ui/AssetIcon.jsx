import React from 'react';

import SunIcon from '../../assets/icons/weather/sun.svg';
import RainIcon from '../../assets/icons/weather/rain.svg';
import SnowIcon from '../../assets/icons/weather/snow.svg';
import CloudIcon from '../../assets/icons/weather/cloud.svg';
import CloudSunIcon from '../../assets/icons/weather/cloud-sun.svg';
import RainSnowIcon from '../../assets/icons/weather/rain-snow.svg';

// BUG import할때 resolve로 설정한 경로가 안먹히는 상황 발생
/** 
 * - 원인 못찾음....
 * - 다 해봣는데 안됨....
 * - 추가 가능성 rules에 추가되어있는 loader가 영향을 줄수도 있음
 * */ 

/*

 resolve: {
		alias: {
			icons: path.resolve(__dirname, 'src/assets'),
 */
			// import Nav from 'components/utils/Nav';
// 
// C:\bok\Dev\Project\ShowBoks\frontend\src\assets\sun.svg
// lkasndlkasndlkasn ::::  C:\bok\Dev\Project\ShowBoks\frontend\src\assets\icons
// import sunIcon from '@icons/weather/sun.svg';
// import sun2 from 'i'


// import Information from 'components/utils/Information';


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

export default AssetIcon;
