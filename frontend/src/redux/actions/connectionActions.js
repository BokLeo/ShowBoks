export const CHECK_SERVER_CONNECTION = 'CHECK_SERVER_CONNECTION';
export const SET_SERVER_STATUS = 'SET_SERVER_STATUS';

export const setServerStatus = (status) => ({
	type: SET_SERVER_STATUS,
	payload: status,
});

export const checkServerConnection = () => async (dispatch) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/status`);
    const data = await response.json();

    if (data.result) {
      dispatch(setServerStatus({
        status: 'working',
        message: 'Server is running.',
      }));
    } else {
      dispatch(setServerStatus({
        status: 'not-working',
        message: 'Failed to connect to the server.',
      }));
    }
  } catch (error) {
    // ERR_CONNECTION_REFUSED가 콘솔에 표시되지 않도록 error 로깅 제거
    dispatch(setServerStatus({
      status: 'error',
      message: 'Failed to connect to the server.',
    }));
  }
};
