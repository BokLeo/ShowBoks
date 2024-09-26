import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(50%);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(100%);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Snackbar = styled.div`
  position: fixed;
  top: 50%;
  padding: 10px 40px;
  background: #333333cc;
  color: #fff;
  text-align: center;
  font-size: 0.825rem;
  font-weight: 600;
  border-radius: 4px;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.5s ease;

  &.fadeOn {
    animation: ${slideIn} 0.5s forwards, ${fadeIn} 0.5s forwards;
  }

  &.fadeOff {
    animation: ${slideOut} 0.5s forwards, ${fadeOut} 0.5s forwards;
  }
`;

const SimpleSnackbar = forwardRef(({ duration = 3000 }, ref) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState('none');

  useImperativeHandle(ref, () => ({
    showSnackbarWithTimeout(msg, timeout = duration) {
      setMessage(msg);
      setVisible(true);
      setDisplay('block');
      setTimeout(() => {
        setVisible(false);
      }, timeout);
    }
  }));

  const handleAnimationEnd = () => {
    if (!visible) {
      setMessage('');
      setDisplay('none');
    }
  };

  return (
    <Snackbar
      className={visible ? 'fadeOn' : 'fadeOff'}
      style={{ display: display }}
      onAnimationEnd={handleAnimationEnd}
    >
      {message}
    </Snackbar>
  );
});

export default SimpleSnackbar;