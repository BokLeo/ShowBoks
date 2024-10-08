const weatherTargetObj = {
	// T1H	기온	℃	10
	// RN1	1시간 강수량	mm	8
	// UUU	동서바람성분	m/s	12
	// VVV	남북바람성분	m/s	12
	// REH	습도	%	8
	// PTY	강수형태	코드값	4
	// VEC	풍향	deg	10
	// WSD	풍속	m/s	10

	'기온': { key: 'T1H', unit: '℃'	},
	'1시간 강수량': { key: 'RN1', unit: 'mm' },
	'동서바람성분': { key: 'UUU', unit: 'm/s' },
	'남북바람성분': { key: 'VVV', unit: 'm/s' },
	'습도': { key: 'REH', unit: '%' },
	'강수형태': { key: 'PTY', unit: '코드값' },
	'풍향': { key: 'VEC', unit: 'deg' },
	'풍속': { key: 'WSD', unit: 'm/s' }
};

import { getWeather } from 'services/outside/Weather';


/*
response.data
{
    "response": {
        "header": {
            "resultCode": "00",
            "resultMsg": "NORMAL_SERVICE"
        },
        "body": {
            "dataType": "JSON",
            "items": {
                "item": [
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "PTY",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "0"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "REH",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "48"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "RN1",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "0"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "T1H",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "22.6"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "UUU",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "-1.1"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "VEC",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "67"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "VVV",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "-0.4"
                    },
                    {
                        "baseDate": "20241008",
                        "baseTime": "1600",
                        "category": "WSD",
                        "nx": 59,
                        "ny": 123,
                        "obsrValue": "1.3"
                    }
                ]
            },
            "pageNo": 1,
            "numOfRows": 10,
            "totalCount": 8
        }
    }
}

*/


async function Weather(key, x1, y1) {
	const response = await getWeather(x1, y1);
	const data = response.data;
	const items = data.response.body.items.item;
	const target = weatherTargetObj[key];
	const targetItem = items.find(item => item.category === target.key);
	return targetItem.obsrValue + target.unit;
}

export default Weather;