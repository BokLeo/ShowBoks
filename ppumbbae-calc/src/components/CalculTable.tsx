// Calculation Component
/*
    - Description : 인원 및 금액을 입력하는 테이블 컴포넌트
    - Date : 2024-05-28
*/
import React from 'react';
import styled from 'styled-components';

import CalculToolbar from './CalculToolbar.tsx';


// react-table-library 사용 -> 취소 ::: 디자인 불만족
// Toast tui-grid 사용 -> 취소 ::: 대중적이지 않음
// MUI UI Library 사용 -> 취소 ::: 라이브러리 없이 만들자

export default function CalculTable() {
 
  return (
    <>
      <CalculToolbar />
      
    </>
  );
}
