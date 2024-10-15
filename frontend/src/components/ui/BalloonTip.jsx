import React, { useState } from 'react';
import styled from 'styled-components';

const BalloonTipDiv = styled.div`
  height: 100%;
  position: relative;
`;

const BalloonTopAlterMsgDom = styled.div`
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: #000;
  color: #fff;
  border-radius: 5px;
  white-space: nowrap;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #000;
  }
`;

const BalloonTip = ({ text, src }) => {
  const [visible, setVisible] = useState(false);

  const mouseEnterEventHandle = () => {
    setVisible(true);
  };

  const mouseLeaveEventHandle = () => {
    setVisible(false);
  };

  return (
    <BalloonTipDiv
      onMouseEnter={mouseEnterEventHandle}
      onMouseLeave={mouseLeaveEventHandle}
    >
      {src}
      <BalloonTopAlterMsgDom $visible={visible}>{text}</BalloonTopAlterMsgDom>
    </BalloonTipDiv>
  );
};

export default BalloonTip;