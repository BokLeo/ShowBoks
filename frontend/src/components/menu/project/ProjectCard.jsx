import react from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Information from 'components/utils/Information';

const ProjectCard = ({ card }) => {

	return (
		<ProjectCardStyle>
			{card.url ? (
				<Link to={card.url} target='_blank' rel='noreferrer'>
					<div className='project-img'>
						<img src={card.img} alt={card.title} />
					</div>
					<div className='project-desc'>
						<h5>{card.title}</h5>
						<ul className='project-desc-list'>
							{Array.isArray(card.desc) ? (
									card.desc.map((desc, index) => (
											<li key={index}>{desc}</li>
									))
							) : (
									<li>설명 데이터가 없습니다.</li>
							)}	
						</ul>
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
				):(
					<>
						<div className='project-img'>
							<img src={card.img} alt={card.title} />
						</div>
						<div className='project-desc'>
							<h5 style={{display: "flex"}}>{card.title}<Information iconName="i" text="현재 사이트 입니다." style={{ }} direction="right" /></h5>
							<ul className='project-desc-list'>
								{Array.isArray(card.desc) ? (
										card.desc.map((desc, index) => (
												<li key={index}>{desc}</li>
										))
								) : (
										<li>설명 데이터가 없습니다.</li>
								)}	
							</ul>
							<div className='project-skill'>
								<h6>Used Tech</h6>
								<ul>
									{card.skills.map((skill, index) => (
										<li key={index}>{skill}</li>
									))}
								</ul>
							</div>
						</div>
					</>
				)
			}
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

	&:hover{
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
		transform: translateY(-4px);
		transition: all 0.3s ease;
		background-color: #f7fbff;
	}

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
		display: flex;
		flex-direction: column;
		gap: 12px;

		h5{
			font-size: 1.25rem;
			font-weight: 600;
		}
		.project-desc-list{
			list-style: none;
			display: flex;
			flex-direction: column;
			line-height: 1.25;
			gap: 8px;
			li{
				&::before{
					content: '🔹';
					margin-right: 8px;
				}
			}
		}

		p{
			font-size: 1rem;
			font-weight: 300;
			line-height: 1.25;
		}

		.project-skill{
			h6{
				font-size: 1rem;
				font-weight: 400;
				margin-bottom: 8px;
				background-color: #333;
				color: #fff;
				border-radius: 4px;
				padding: 4px 8px;
				display: inline-block;
			}

			ul{
				display: flex;
				gap: 8px;
				flex-wrap: wrap;
				li{
					font-size: 1rem;
					font-weight: 300;
					padding: 0.25rem 0.5rem;
					border: 1px solid #666;
					border-radius: 4px;
				}
			}
		}
	}
`;