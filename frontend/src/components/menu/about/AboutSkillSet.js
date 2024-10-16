import React, { useState } from 'react';
import { Box, Button, ButtonGroup, Container } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const dataset = [
  { category: '언어 도구', items: [
    { skill: 'HTML5', level: 90 },
    { skill: 'CSS3(SCSS)', level: 90 },
    { skill: 'JavaScript', level: 80 },
    { skill: 'TypeScript', level: 50 },
    { skill: 'JAVA', level: 60 },
  ]},
  { category: '프레임워크 & 라이브러리', items: [
    { skill: 'React', level: 80 },
    { skill: 'Vue', level: 80 },
		{ skill: 'Spring', level: 60 },
    { skill: 'ChartJs', level: 70 },
		{ skill: 'eChart', level: 90 },
  ]},
  { category: '데이터베이스', items: [
    { skill: 'Oracle SQL', level: 85 },
    { skill: 'MySQL', level: 70 },
  ]},
  { category: 'Others', items: [
    { skill: 'Github', level: 70 },
    { skill: 'Adobe Illustrator', level: 90 },
    { skill: 'Adobe Photoshop', level: 90 },
  ]},
];
// 잔디심기
export default function AboutSkillSet() {
  const [selectedCategory, setSelectedCategory] = useState(dataset[0].category);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const selectedData = dataset.find(data => data.category === selectedCategory);

  const data = {
    labels: selectedData.items.map(item => item.skill),
    datasets: [
      {
        label: 'Skill Level',
        data: selectedData.items.map(item => item.level),
        backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
					'rgba(99, 255, 132, 0.2)' 
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
					'rgba(99, 255, 132, 1)' 
				],
        borderWidth: 1,
				barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				max: 100, // y축의 최대값을 100으로 설정
			},
		},
    plugins: {
      legend: {
				display: false,
      },
			datalabels: {
        anchor: 'end',
        align: 'end',
        formatter: (value) => value,
        color: 'black',
        font: {
          weight: 'bold',
        },
      },
    },
  };

  return (
    <Container>
      <ButtonGroup 
				size="small" 
				variant="contained"
				// variant="text" 
			>
        {dataset.map(data => (
          <Button 
						key={data.category} 
						onClick={() => handleCategoryChange(data.category)}
						style={{
							color: selectedCategory === data.category ? '#fff' : 'black',
							backgroundColor: selectedCategory === data.category ? '#007bff' : 'white',
							fontWeight: selectedCategory === data.category ? 'bold' : 'normal',
						}}
					>
            {data.category}
          </Button>
        ))}
      </ButtonGroup>

      <Box mt={2}>
        <div>
          <Bar data={data} options={options} />
        </div>
      </Box>
    </Container>
  );
}