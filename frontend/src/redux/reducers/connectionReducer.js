import { SET_SERVER_STATUS } from '../actions/connectionActions';

const initialState = {
  serverStatus: {
    status: 'checking',
    message: 'Checking server status...',
  },
};

const connectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVER_STATUS:
      return {
        ...state,
        serverStatus: action.payload,
      };
    default:
      return state;
  }
};

export default connectionReducer;