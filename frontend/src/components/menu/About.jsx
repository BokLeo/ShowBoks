// this page is About page
import React, { useState, useEffect } from 'react';
// AboutSkillSet component import
import AboutSkillSet from 'components/menu/about/AboutSkillSet';
import Container from '@mui/material/Container';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

import ToggleBtn from 'components/ui/ToggleBtn';
import Card from 'components/ui/Card';
import Information from 'components/utils/Information';

// Material-UI Icons
import DevicesIcon from '@mui/icons-material/Devices';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import BrushIcon from '@mui/icons-material/Brush';

// AboutModules component import
import AboutModules from 'components/menu/about/AboutModules';
import BalloonTip from 'components/ui/BalloonTip';

const About = () => {
	const [isAllFlipped, setIsAllFlipped] = useState(false);

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

						<div className='modules'>
							<AboutModules />
						</div>
					</div>
				</div>

				<div className='panel-right'>
					<div className='section'>
						<div className='title'>Tech Stack<Information iconName="i" text="ChartJs를 활용하였습니다. 📊" /></div>
						<AboutSkillSet />
					</div>

					<div className='section'>
						<h3 className='title'>
							Can Do
							<ToggleBtn isActive={isAllFlipped} onClick={() => setIsAllFlipped(!isAllFlipped)}>
								{isAllFlipped ? '전체 닫기' : '전체 열기'}
							</ToggleBtn>
						</h3>

						<ul className='detail'>
							<li>
								<Card
									frontContent={
										<div className='front'>
											<IntegrationInstructionsIcon />
											<h4>Dev</h4>
										</div>
									}
									backContent={
										<div className='back'>
											<h4>웹 개발</h4>
											<div className='back-detail'>
												<p className='back-comment'>
													비즈니스 성장과 사용자 경험 향상을 중요하게 생각하며, 지속 가능한 개발을 지향합니다.
												</p>
												<div className='back-skills'>
													<div className='wrap'>
														<h5>FrontEnd</h5>
														<ul>
															<li className='logo Js'><BalloonTip text={"JavaScript"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/js.png`} alt="JavaScript" />}/></li>
															<li className='logo React'><BalloonTip text={"React"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/reactjs.png`} alt="React" />}/></li>
															<li className='logo Vue'><BalloonTip text={"Vue"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/vue.png`} alt="Vue" />}/></li>
														</ul>
													</div>
													<div className='wrap'>
														<h5>BackEnd</h5>
														<ul>
															<li className='logo Java'><BalloonTip text={"Java"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/java.png`} alt="java" />}/></li>
															<li className='logo Spring'><BalloonTip text={"Spring"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/spring.png`} alt="Spring" />}/></li>
															<li className='logo NodeJs'><BalloonTip text={"Node.js"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/nodejs.png`} alt="Node.js" />}/></li>
														</ul>
													</div>
													<div className='wrap'>
														<h5>DBMS</h5>
														<ul>
															<li className='logo Oracle'><BalloonTip text={"Oracle"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/oracle.png`} alt="Oracle" />}/></li>
															<li className='logo MySql'><BalloonTip text={"MySql"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/mysql.png`} alt="MySql" />}/></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									}
									isFlipped={isAllFlipped}
								/>
							</li>

							<li>
								<Card
									frontContent={
										<div className='front'>
											<DevicesIcon />
											<h4>Responsive Publishing</h4>
										</div>
									}
									backContent={
										<div className='back'>
											<h4>반응형<br />퍼블리싱</h4>
											<div className='back-detail'>
												<p className='back-comment'>
													다양한 디바이스 최적화된 유연한 반응형 웹을 구현하며, 사용자에게 일관된 경험을 제공합니다.
												</p>
												<div className='back-skills'>
													<div className="wrap">
														<h5>기술목록</h5>
														<ul>
															<li className='logo HTML'><BalloonTip text={"HTML5"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/html5.png`} alt="HTML5" />}/></li>
															<li className='logo CSS'><BalloonTip text={"CSS3"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/css3.png`} alt="CSS3" />}/></li>
															<li className='logo SCSS'><BalloonTip text={"SCSS"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/sass.png`} alt="SCSS" />}/></li>
															<li className='logo Js'><BalloonTip text={"JavaScript"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/js.png`} alt="JavaScript" />}/></li>
															<li className='logo jQuery'><BalloonTip text={"jQuery"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/jquery.png`} alt="jQuery" />}/></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									}
									isFlipped={isAllFlipped}
								/>
							</li>
							
							<li>
								<Card
									frontContent={
										<div className='front'>
											<BrushIcon />
											<h4>Design</h4>
										</div>
									}
									backContent={
										<div className='back'>
											<h4>디자인</h4>
											<div className='back-detail'>
												<p className='back-comment'>
													사용자 경험을 최우선으로 고려한 UX 디자인을 통해 직관적이고 쉬운 네비게이션을 설계합니다.
												</p>
												<div className='back-skills'>
													<div className="wrap">
														<h5>기술목록</h5>
														<ul>
															<li className='logo Illustrator'><BalloonTip text={"Adobe Illustrator"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/illustrator.png`} alt="Adobe Illustrator" />}/></li>
															<li className='logo Photoshop'><BalloonTip text={"Adobe Photoshop"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/photoshop.png`} alt="Adobe Photoshop" />}/></li>
															<li className='logo Figma'><BalloonTip text={"Figma"} src={<img src={`${process.env.PUBLIC_URL}/images/logo/figma.png`} alt="Figma" />}/></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									}
									isFlipped={isAllFlipped}
								/>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default About;
