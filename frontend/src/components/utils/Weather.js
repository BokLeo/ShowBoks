const weatherTargetObj = {
  'POP': { unit: '%', ko: '강수확률' },
  'PTY': { unit: '코드값', ko: '강수형태' },
  'PCP': { unit: 'mm', ko: '1시간 강수량' },
  'REH': { unit: '%', ko: '습도' },
  'SNO': { unit: 'cm', ko: '1시간 신적설' },
  'SKY': { unit: '코드값', ko: '하늘상태' },
  'TMP': { unit: '℃', ko: '1시간 기온' },
  'TMN': { unit: '℃', ko: '일 최저기온' },
  'TMX': { unit: '℃', ko: '일 최고기온' },
  'UUU': { unit: 'm/s', ko: '동서바람성분' },
  'VVV': { unit: 'm/s', ko: '남북바람성분' },
  'WAV': { unit: 'M', ko: '파고' },
  'VEC': { unit: 'deg', ko: '풍향' },
  'WSD': { unit: 'm/s', ko: '풍속' },
  'T1H': { unit: '℃', ko: '기온' },
  'RN1': { unit: 'mm', ko: '1시간 강수량' },
  'LGT': { unit: 'kA', ko: '낙뢰' }
};

import { getWeather } from 'services/outside/Weather';

const groupByDateAndTime = (items) => {
  const groupedItems = {};

  items.forEach(item => {
    // fcstDate와 fcstTime을 하나의 키로 결합
    const key = `${item.fcstDate}_${item.fcstTime}`;
    
    // 해당 키가 없으면 새로 생성
    if (!groupedItems[key]) {
      groupedItems[key] = {
        fcstDate: item.fcstDate,
        fcstTime: item.fcstTime,
        data: []
      };
    }
    
    // 해당 키의 data 배열에 category, fcstValue, unit, ko 추가
    groupedItems[key].data.push({
      category: item.category,
      fcstValue: item.fcstValue,
      unit: weatherTargetObj[item.category]?.unit === '코드값' ? '' : weatherTargetObj[item.category]?.unit,
      ko: weatherTargetObj[item.category]?.ko || 'unknown'
    });
  });

  // 그룹화된 결과를 배열로 반환
  return Object.values(groupedItems);
};

async function Weather(keys, x1, y1) {
  try {
    const response = await getWeather(x1, y1);
    const data = response.data;
    const items = data.response.body.items.item;

    if (!Array.isArray(keys)) {
      keys = [keys];
    }

		const filteredItems = items.filter(item => keys.includes(item.category));
		
		const result = groupByDateAndTime(filteredItems);
		return result;

  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export default Weather;