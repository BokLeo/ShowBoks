// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

// Feature Components
import Calculator from './Calculator';

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
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/Calculator" element={<Calculator />} className='section-link' >
					<h2>정산 계산기</h2>
        </Link>

        <p>모임에서 사용한 금액을 정산하는 계산기</p>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature2" className='section-link'>
          <h2>Update 예정</h2>
        </Link>
      
        <p>기능 개발중 입니다.</p>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature3" className='section-link'>
          <h2>Update 예정</h2>
        </Link>
      
        <p>기능 개발중 입니다.</p>
      </section>

      <section 
        className='App-body__section'
        onMouseEnter={onHoverSection} 
        onMouseLeave={onLeaveSection}
      >
        <Link to="/feature4" className='section-link'>
          <h2>Update 예정</h2>
        </Link>
      
        <p>기능 개발중 입니다.</p>
      </section>
    </>
  );
}


export default Home;