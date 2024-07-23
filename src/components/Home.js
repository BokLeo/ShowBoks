// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const onHoverSection = (e) => {
    e.preventDefault();
    fn_checkingClass(e);
  };

  const onLeaveSection = (e) => {
    e.preventDefault();
    fn_checkingClass(e);
  };

  const fn_checkingClass = (e) => {
    e.preventDefault();
    const section = e.target.closest('.App-body__section');
		const classArr = section.classList;

    classArr.contains('active') ? classArr.remove('active') : classArr.add('active');
  };

  return (
    <>
      <section 
        className='App-body__section active'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature1" className='section-link on' >
					<h2>정산 계산기</h2>
        </Link>

        <ul className='section-dec'>
          <li><span className='section-dec-title'>💠Description</span>모임에서 사용한 금액을 정산하는 계산기</li>
          <li>
            <span className='section-dec-title'>💠lang</span>
            <ul>
              <li>React</li>
            </ul>
          </li>
        </ul>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature2" className='section-link off'>
          <h2>Update 예정</h2>
        </Link>
      
        <ul className='section-dec'>
          <li><span className='section-dec-title'>💠Description</span>업데이트 예정입니다...</li>
          <li>
            <span className='section-dec-title'>💠lang</span>
            <ul>
              <li>...</li>
            </ul>
          </li>
        </ul>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature3" className='section-link off'>
          <h2>Update 예정</h2>
        </Link>
      
        <ul className='section-dec'>
          <li><span className='section-dec-title'>💠Description</span>업데이트 예정입니다...</li>
          <li>
            <span className='section-dec-title'>💠lang</span>
            <ul>
              <li>...</li>
            </ul>
          </li>
        </ul>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature4" className='section-link off'>
          <h2>Update 예정</h2>
        </Link>
      
        <ul className='section-dec'>
          <li><span className='section-dec-title'>💠Description</span>업데이트 예정입니다...</li>
          <li>
            <span className='section-dec-title'>💠lang</span>
            <ul>
              <li>...</li>
            </ul>
          </li>
        </ul>
      </section>
    </>
  );
}


export default Home;