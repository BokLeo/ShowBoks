// this page is About page
import React from 'react';
// AboutSkillSet component import
import AboutSkillSet from 'components/menu/about/AboutSkillSet';
import Container from '@mui/material/Container';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';


const About = () => {
	return (
		<div className='about'>
			<div className='panel-wrap'>
				<div className='panel-left'>
					<div className='panel-left-wrap'>
						<div className='about-me-img'>
							<img
								src={`${process.env.PUBLIC_URL}/images/profile.webp`}
								alt='Profile'
							/>
						</div>

						<div className='introduce'>
							<h3 className='title'>
								"사용자 경험을 최우선으로 생각하는 프론트엔드 개발자,
								강성복입니다."
							</h3>
							<div className='sub-title'>부연설명.</div>
						</div>
						<ul className='detail'>
							<li>
								<span className='option'>경력</span>3년차
							</li>
							<li>
								<span className='option'>Tell</span>010-5694-8240
							</li>
							<li>
								<span className='option'>E-mail</span>yobad713@naver.com
							</li>
						</ul>
					</div>
				</div>

				<div className='panel-right'>
					<div className='section'>
						<div className='title'>Tech Stack</div>
						{/* <ResponsiveChartContainer className='detail'> */}
							<AboutSkillSet />
						{/* </ResponsiveChartContainer> */}
					</div>

					<div className='section'>
						<h3 className='title'>I can do it</h3>
						<ul className='detail'>
							<li>
								<h4>Developments of web</h4>
								<p>
									퍼블리싱, 프론트, 백엔드 개발을 통해 웹 사이트를 제작할 수
									있습니다.
								</p>
							</li>
							<li>
								<h4>Responsive Web</h4>
								<p>반응형 웹 페이지를 CSS(SCSS)를 통해 구현할 수 있습니다.</p>
							</li>
							<li>
								<h4>Design</h4>
								<p>사용자 중심의 웹 디자인이 가능합니다.</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
