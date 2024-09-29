import react from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { ChartsTooltip, ChartsXAxis, LinePlot, MarkPlot } from '@mui/x-charts';

// const chartSetting = {
//   xAxis: [
//     {
//       label: 'rainfall (mm)',
//     },
//   ],
//   width: 500,
//   height: 400,
// };


const dataset = [
  // 기술 스택
  { category: '기술 스택', skill: 'HTML', level: 90 },
  { category: '기술 스택', skill: 'CSS', level: 85 },
  { category: '기술 스택', skill: 'JavaScript', level: 80 },
  { category: '기술 스택', skill: 'TypeScript', level: 75 },

  // 프레임워크 & 라이브러리
  { category: '프레임워크 & 라이브러리', skill: 'React', level: 80 },
  { category: '프레임워크 & 라이브러리', skill: 'Next.js', level: 70 },
  { category: '프레임워크 & 라이브러리', skill: 'Redux', level: 65 },

  // 데이터베이스
  { category: '데이터베이스', skill: 'Oracle SQL', level: 60 },
  { category: '데이터베이스', skill: 'MySQL', level: 55 },
];


const valueFormatter = (value) => `${value} / 100`;


export default function HorizontalBars() {
  return (
		<>
			{/* <ResponsiveChartContainer 
				dataset={dataset}
				series={[
					{ dataKey: 'level', stack: '기술 스택', label: '기술 스택', color: '#3f51b5' },
					{ dataKey: 'level', stack: '프레임워크 & 라이브러리', label: '프레임워크 & 라이브러리', color: '#ff5722' },
					{ dataKey: 'level', stack: '데이터베이스', label: '데이터베이스', color: '#4caf50' },
				]}
				// width={600}
				// height={350}
			/> */}
{/* [ ] mui chart를 써볼껀데 지금 당장 급한건 이게 아님 response로 구성하는 방법 해보기 */}
<ResponsiveChartContainer
          series={[
            {
              type: 'line',
              data: [1, 2, 3, 2, 1],
            },
          ]}
          xAxis={[
            {
              data: ['A', 'B', 'C', 'D', 'E'],
              scaleType: 'band',
              id: 'x-axis-id',
            },
          ]}
          height={200}
        >
          <LinePlot />
          <ChartsXAxis label="X axis" position="bottom" axisId="x-axis-id" />
          <MarkPlot />
          <ChartsTooltip />
        </ResponsiveChartContainer>
		</>
    // <BarChart
    //   dataset={dataset}
    //   xAxis={[{ scaleType: 'linear', dataKey: 'skill', label: 'category' }]}
    //   yAxis={[{ scaleType: 'band', dataKey: 'level', label: 'Skill' }]}
    //   series={[
    //     { dataKey: 'level', stack: '기술 스택', label: '기술 스택', color: '#3f51b5' },
    //     { dataKey: 'level', stack: '프레임워크 & 라이브러리', label: '프레임워크 & 라이브러리', color: '#ff5722' },
    //     { dataKey: 'level', stack: '데이터베이스', label: '데이터베이스', color: '#4caf50' },
    //   ]}
    //   layout="horizontal" // 가로 방향 차트
		// 	slotProps={{ legend: { hidden: true } }}
		// 	width={600}
		// 	height={350}
    // />
  );
}

// export default AboutSkillSet;