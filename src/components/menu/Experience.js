// this page is About page

import React, { useEffect, useRef } from 'react';

class Job{
  constructor(period, title, company, desc, skills){
    this.period = period;
    this.title = title;
    this.company = company;
    this.desc = desc;
    this.skills = skills;
  }
}

const jobs = [
  new Job(
    '2022.07 - 2024.04',
    'Frontend Developer', 
    '㈜WiseLake', 
    'Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.',
    ['React', 'Next.js', 'Typescript', 'Node.js', 'GraphQL', 'Storybook', 'Styled Components', 'Git']
  ),
  new Job(
    '2020.08 - 2021.08',
    'Publisher', 
    '㈜신영이에스디',
    'Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.',
    ['HTML5', 'CSS3', 'SCSS', 'Javascript', 'jQuery', 'Adobe Photoshop']
  ),
  new Job(
    '2016.12 - 2019.01',
    'Designer', 
    '㈜세중에스앤씨', 
    'Build, style, and ship high-quality websites, design systems, mobile apps, and digital experiences for a diverse array of projects for clients including Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, and more. Provide leadership within engineering department through close collaboration, knowledge shares, and spearheading the development of internal tools.',
    ['Adobe Illustrator', 'Adobe Photoshop']
  ),
];


const toggleHoverActive = (e) => {
  e.preventDefault();
  const jobList = e.target.closest('.job-list');
  const jobItems = jobList.querySelectorAll('.job');

  jobItems.forEach(item => {
    item.classList.remove('active');
  });

  e.target.closest('.job').classList.add('active');
};


/** 
 * TODO : 한 페이지 내에서 버튼으로 window(화면)을 이동시키는 기능 구현에 어려움 발생.
 * - Date : 2024.08.29
 * - 브라우저의 Flags(실험실) 기능 중 'Smooth Scrolling'이 활성화 되어 있어야만 동작하는 것으로 보임.
 * - 해결하기 위해서 아래와 같은 시도해봄
 *    > scrollTo, scrollIntoView 등의 메서드 테스트 해봄 -> 실패
 *    > react-scroll 라이브러리 사용해봄 -> 실패
 *    > useRef를 사용해봄 -> 실패
 * - 과거 js로만으로도 충분히 구현 가능했던 기능이 react에서는 어려움을 겪고 있음. 분석 필요.
 * 
 * **/


const Experience = () => {
  // scroll event
  const scrollRef = useRef([]);
    
  const clickStickyTitle = (ref) => {
    const listItems = document.querySelectorAll('.sticky-title > ul > li');
    const listElements = document.querySelectorAll('.experience-section');
    const index = Array.from(listItems).indexOf(ref.target);

    listItems.forEach((item, idx) => {
      if (idx === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    listElements.forEach((el, idx) => {
      if (idx === index) {
        const elTop = el.offsetTop;
        window.scrollTo({top: elTop - 100, behavior: 'smooth'});
      }
    }
    );
  };


    

  return (
    <div className="experience">
      
      <div className="sticky-title">
        <h3>Experience</h3>
        <ul>
          <li onClick={clickStickyTitle} className='active' >Career</li>
          <li onClick={clickStickyTitle} >Education</li>
          <li onClick={clickStickyTitle} >Certification</li>
        </ul>
      </div>

      <div className="experience-detail"  >
        <div className='experience-section' ref={(el)=>{scrollRef.current[0] = el}}>
          <h4>경력</h4>

          <ul className="job-list">
            {jobs.map((job, index) => (
              <li
                className={`job ${index === 0 ? "active" : ""}`}
                key={index}
                onMouseEnter={toggleHoverActive}
              >
                <div className="period">{job.period}</div>

                <div className="detail">
                  <h5 className="job-title">
                    {job.title}
                    <span className="dashed" />
                    {job.company}
                  </h5>
                  <p className="job-desc">{job.desc}</p>
                  <div className="job-skill">
                    <h5>Used Tech</h5>
                    <ul className="skills">
                      {job.skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className='experience-section' ref={(el)=>{scrollRef.current[0] = el}}> 
          <h4>학력</h4>

          <ul className="edu-list">
            <li className="edu">
              <div className="period">2021.09 ~ 2022.03</div>
              <div className="detail">
                <h5 className="edu-title">한국소프트웨어인재개발원(KOSMO)</h5>
                <p className="edu-desc">
                  JAVA 개발자 양성과정(프로젝트 최우수상/특모범상/봉사상 수상)
                </p>
              </div>
            </li>
            <li className="edu">
              <div className="period">2019.12 ~ 2020.04</div>
              <div className="detail">
                <h5 className="edu-title">이젠컴퓨터학원(안양)</h5>
                <p className="edu-desc">
                  스마트기기 UI/UX 웹디자인(웹퍼블리싱과정)
                </p>
              </div>
            </li>
            <li className="edu">
              <div className="period">2011.03 ~ 2017.03</div>
              <div className="detail">
                <h5 className="edu-title">건양대학교(4년제)</h5>
                <p className="edu-desc">시각디자인학과</p>
              </div>
            </li>
            <li className="edu">
              <div className="period">2008.03 ~ 2011.03</div>
              <div className="detail">
                <h5 className="edu-title">인덕원고등학교</h5>
                <p className="edu-desc">이과계열</p>
              </div>
            </li>
          </ul>
        </div>

        <div className='experience-section' ref={(el)=>{scrollRef.current[0] = el}}> 
          <h4>자격</h4>

          <ul className="cert-list">
            <li className="cert">
              <div className="period">2020.04</div>
              <div className="detail">
                <h5 className="cert-title">웹디자인기능사</h5>
                <p className="cert-desc">
                  한국산업인력공단
                </p>
              </div>
            </li>
            <li className="cert">
              <div className="period">2020.01</div>
              <div className="detail">
                <h5 className="cert-title">GTQ포토샵 1급</h5>
                <p className="cert-desc">
                  한국생산성본부(KPC)
                </p>
              </div>
            </li>
            <li className="cert">
              <div className="period">2020.01</div>
              <div className="detail">
                <h5 className="cert-title">GTQ일러스트 1급</h5>
                <p className="cert-desc">
                  한국생산성본부(KPC)
                </p>
              </div>
            </li>
            <li className="cert">
              <div className="period">2017.11</div>
              <div className="detail">
                <h5 className="cert-title">자동차운전면허</h5>
                <p className="cert-desc">
                  경찰청(운전면허시험관리단)
                </p>
              </div>
            </li>
            <li className="cert">
              <div className="period">2011.05</div>
              <div className="detail">
                <h5 className="cert-title">MOS Office PowerPoint</h5>
                <p className="cert-desc">
                  Microsoft
                </p>
              </div>
            </li>
            <li className="cert">
              <div className="period">2011.05</div>
              <div className="detail">
                <h5 className="cert-title">ACA Photoshop CS3</h5>
                <p className="cert-desc">
                  ADOBE
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};

export default Experience;