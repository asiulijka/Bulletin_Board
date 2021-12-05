/* selectors */
export const getPosts = ({posts}) => posts.data;
export const getPostDetails = ({posts}, postId) => posts.data.filter(e => e.id === postId)[0];
export const getUserPosts = ({posts, user}) => {
  if (user.data.type != 'admin'){
    return posts.data.filter(e => e.userId === user.data.id);
  } else {
    return posts.data;
  };
};
export const getUser = ({user}) => user.data;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const POST_ADD_START = createActionName('POST_ADD_START');
const POST_ADD_SUCCESS = createActionName('POST_ADD_SUCCESS');
const POST_ADD_ERROR = createActionName('POST_ADD_ERROR');

const POST_UPDATE_START = createActionName('POST_UPDATE_START');
const POST_UPDATE_SUCCESS = createActionName('POST_UPDATE_SUCCESS');
const POST_UPDATE_ERROR = createActionName('POST_UPDATE_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const postAddStarted = payload => ({ payload, type: POST_ADD_START });
export const postAddSuccess = payload => ({ payload, type: POST_ADD_SUCCESS });
export const postAddError = payload => ({ payload, type: POST_ADD_ERROR });

export const postUpdateStarted = payload => ({ payload, type: POST_UPDATE_START });
export const postUpdateSuccess = payload => ({ payload, type: POST_UPDATE_SUCCESS });
export const postUpdateError = payload => ({ payload, type: POST_UPDATE_ERROR });

/* thunk creators */
export const addPost = (post) => {
  return (dispatch, getState) => {
    dispatch(postAddStarted());
    dispatch(postAddSuccess(post));

    // Axios
    //   .get(`${api.url}/api/${api.tables}`)
    //   .then(res => {
    //     dispatch(fetchSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchError(err.message || true));
    //   });
  };
};

export const updatePost = post => {
  return (dispatch, getState) => {
    dispatch(postUpdateStarted());
    dispatch(postUpdateSuccess(post));

    // Axios
    //   .get(`${api.url}/api/${api.tables}`)
    //   .then(res => {
    //     dispatch(fetchSuccess(res.data));
    //   })
    //   .catch(err => {
    //     dispatch(fetchError(err.message || true));
    //   });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case POST_ADD_SUCCESS: {
      return {
        ...statePart,
        data: [
          ...statePart.data,
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            published: action.payload.published,
            actualised: action.payload.actualised,
            email: action.payload.email,
            userId: action.payload.userId,
            status: action.payload.status,
            photo: action.payload.photo,
            price: action.payload.price,
            phone: action.payload.phone,
            location: action.payload.location,
          },
        ],
        loading: {
          active: false,
          error: false,
        },
      }
    }
    case POST_UPDATE_SUCCESS: {
      return {
        ...statePart,
        data: statePart.data.map(post => post.id == action.payload.id ? 
          {
            id: action.payload.id,
            title: action.payload.title,
            description: action.payload.description,
            published: action.payload.published,
            actualised: action.payload.actualised,
            email: action.payload.email,
            userId: action.payload.userId,
            status: action.payload.status,
            photo: action.payload.photo,
            price: action.payload.price,
            phone: action.payload.phone,
            location: action.payload.location,
          }
          : post
        ),
        loading: {
          active: false,
          error: false,
        },
      }
    }
    default:
      return statePart;
  }
};
