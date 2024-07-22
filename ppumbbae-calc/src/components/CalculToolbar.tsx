import React from 'react';
import styled from 'styled-components';

// FullFeaturedCrudGrid component

const CalculToolbar = () => {
    // 인원추가 버튼을 누르면 인원을 추가하는 함수
    const addPerson = () => {
        // 인원 추가
        /*
            

        */
        
    };



    return (
        <ul className='CalculToolbar'>
            {/* 인원추가 */}
            {/* <li><button className='btn'>인원추가</button></li> */}
            <li><button className='btn' onClick={addPerson}>인원추가</button></li>
            {/* 인원삭제 */}
            <li><button className='btn'>인원삭제</button></li>
            {/* 금액추가 */}
            {/* 초기화 */}
            <li><button className='btn'>초기화</button></li>
        </ul>
    );
};

export default CalculToolbar;
