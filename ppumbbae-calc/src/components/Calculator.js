// Calculation Component
/*
    - Description : 금액과 비율을 입력받아 계산하는 컴포넌트
    - Date : 2024-05-22
*/
import React, { useState } from 'react';
import styled from 'styled-components';

// FullFeaturedCrudGrid component
import CalculTable from './CalculTable.tsx';

// Updated Calculator component

/*
  - 한개만 내보낼때는 Default Export를 사용한다.
  - 여러개를 내보낼때는 Named Export를 사용한다.
    : 해당 컴포넌트에서는 계산기의 큰 틀을 담당하는 컴포넌트이므로 Default Export를 사용한다.
      ※ 모듈과 같은 기능 Component를 만들때는 Named Export를 사용하기로 하자(나의 규칙)
*/

// 1 Named Export
// export default function Calculator(){
//   return (
//     <div className='CalculatorContainer'>
//       <CalculTable />
//     </div>
//   );
// };

// 2 Defualt Export
const Calculator = () => {
  return (
    <div className='CalculatorContainer'>
      <CalculTable />
    </div>
  );
};

export default Calculator;
