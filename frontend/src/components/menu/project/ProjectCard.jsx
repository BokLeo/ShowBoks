import react from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ProjectCard = ({ card }) => {

	return (
		<ProjectCardStyle>
			<Link to={card.url} target='_blank' rel='noreferrer'>
				<div className='project-img'>
					<img src={card.img} alt={card.title} />
				</div>
				<div className='project-desc'>
					<h5>{card.title}</h5>
					<p>{card.desc}</p>
					<div className='project-skill'>
						<h6>Used Tech</h6>
						<ul>
							{card.skills.map((skill, index) => (
								<li key={index}>{skill}</li>
							))}
						</ul>
					</div>
				</div>
			</Link>
		</ProjectCardStyle>
		
	)
};

export default ProjectCard;

const ProjectCardStyle = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1rem;
	margin-bottom: 2rem;
	border: 1px solid #ddd;
	border-radius: 4px;
	box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

	.project-img{
		display: flex;
    justify-content: center;
    align-items: center;
		img{
			height: 200px;
			object-fit: scale-down;
			border-radius: 4px;
		}
	}

	.project-desc{
		h5{
			font-size: 1.25rem;
			font-weight: 600;
			margin-bottom: 12px;
		}

		p{
			font-size: 1rem;
			font-weight: 300;
			margin-bottom: 12px;
			line-height: 1.25;
		}

		.project-skill{
			h6{
				font-size: 1rem;
				font-weight: 400;
				margin-bottom: 4px;
				background-color: #333;
				color: #fff;
				border-radius: 4px;
				padding: 4px 8px;
				display: inline-block;
			}

			ul{
				display: flex;
				gap: 1rem;
				flex-wrap: wrap;
				li{
					font-size: 1rem;
					font-weight: 300;
					background-color: #cee2f3;
					
					padding: 0.25rem 0.5rem;
					border-radius: 4px;
				}
			}
		}
	}
`;