import * as React from 'react';
import styled, { css, keyframes } from 'styled-components';

export default function SimpleSnackbar(props) {
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState(props.param.message);
  const [duration, setDuration] = React.useState(props.param.duration);

  React.useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, duration]);

  return (
    <Snackbar className={visible ? 'fadeOn' : 'fadeOff'}>
      {message}
    </Snackbar>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(50%);
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