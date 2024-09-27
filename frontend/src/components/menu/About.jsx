// this page is About page
import React from 'react';

const About = () => {
	return (
		<div className='about'>
			<div className='panel-wrap'>
				<div className='panel-right'>
					<div className='about-me-img'>이미지</div>
					<div className='introduce'>
						<h3 className='intro'>Frontend Developer 강성복</h3>
						<div className='sub-title'>
							창의적 코드로 더 나은 경험을 만듭니다.
						</div>
					</div>
				</div>

				<div className='panel-left'>
					<div className='section'>
						<ul>
							<li>
								<span className='option'>경력.</span>3년차
							</li>
							<li>
								<span className='option'>Tell.</span>010-5694-8240
							</li>
							<li>
								<span className='option'>E-mail.</span>yobad713@naver.com
							</li>
						</ul>
					</div>

					<div className='section'>
						<div className='title'>Skills</div>
						<ul>
							<li>HTML5</li>
							<li>CSS3</li>
							<li>JavaScript</li>
							<li>React</li>
							<li>Node.js</li>
							<li>Express</li>
							<li>MongoDB</li>
							<li>MySQL</li>
						</ul>
					</div>

					<div className='section'>
						<h3 className='title'>I can do it</h3>
						<ul>
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
