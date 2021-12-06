/* selectors */
export const getUser = ({user}) => user.data;

/* action name creator */
const reducerName = 'users';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const USER_TYPE_CHANGE_START = createActionName('USER_TYPE_CHANGE_START');
const USER_TYPE_CHANGE_SUCCESS = createActionName('USER_TYPE_CHANGE_SUCCESS');
const USER_TYPE_CHANGE_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const userTypeChangeStarted = payload => ({ payload, type: USER_TYPE_CHANGE_START });
export const userTypeChangeSuccess = payload => ({ payload, type: USER_TYPE_CHANGE_SUCCESS });
export const userTypeChangeError = payload => ({ payload, type: USER_TYPE_CHANGE_ERROR });

/* thunk creators */
export const changeUserType = userType => {
  return (dispatch, getState) => {
    dispatch(userTypeChangeStarted());
    dispatch(userTypeChangeSuccess(userType)); // no DB integration yet
    console.log(userType);
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case USER_TYPE_CHANGE_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case USER_TYPE_CHANGE_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: {
          ...statePart.data,
          type: action.payload,
        },
      };
    }
    case USER_TYPE_CHANGE_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
