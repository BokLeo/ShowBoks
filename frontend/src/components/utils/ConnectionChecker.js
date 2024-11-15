import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkServerConnection } from '../../redux/actions/connectionActions';

const ConnectionChecker = () => {
  const dispatch = useDispatch();

	useEffect(() => {
    const interval = setInterval(() => {
      dispatch(checkServerConnection());
    }, 60000);
    dispatch(checkServerConnection());

    return () => clearInterval(interval);
  }, [dispatch]);

  return null; // UI를 렌더링하지 않음
};

export default ConnectionChecker;