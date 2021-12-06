import Axios from 'axios';

/* selectors */
export const getPosts = ({posts}) => posts.data;
export const getPostsLoadingState = ({posts}) => posts.loading;
export const getPostDetails = ({posts}, postId) => posts.data.filter(e => e._id === postId)[0];
export const getUserPosts = ({posts, user}) => {
  if (user.data.type !== 'admin'){
    return posts.data.filter(e => e.userId === user.data._id);
  } else {
    return posts.data;
  }
};
export const getUser = ({user}) => user.data;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const FETCH_POST_START = createActionName('FETCH_POST_START');
const FETCH_POST_SUCCESS = createActionName('FETCH_POST_SUCCESS');
const FETCH_POST_ERROR = createActionName('FETCH_POST_ERROR');

const POST_ADD_START = createActionName('POST_ADD_START');
const POST_ADD_SUCCESS = createActionName('POST_ADD_SUCCESS');
const POST_ADD_ERROR = createActionName('POST_ADD_ERROR');

const POST_UPDATE_START = createActionName('POST_UPDATE_START');
const POST_UPDATE_SUCCESS = createActionName('POST_UPDATE_SUCCESS');
const POST_UPDATE_ERROR = createActionName('POST_UPDATE_ERROR');

/* action creators */
export const fetchPostsStarted = payload => ({ payload, type: FETCH_START });
export const fetchPostsSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchPostsError = payload => ({ payload, type: FETCH_ERROR });

export const fetchPostStarted = payload => ({ payload, type: FETCH_POST_START });
export const fetchPostSuccess = payload => ({ payload, type: FETCH_POST_SUCCESS });
export const fetchPostError = payload => ({ payload, type: FETCH_POST_ERROR });

export const postAddStarted = payload => ({ payload, type: POST_ADD_START });
export const postAddSuccess = payload => ({ payload, type: POST_ADD_SUCCESS });
export const postAddError = payload => ({ payload, type: POST_ADD_ERROR });

export const postUpdateStarted = payload => ({ payload, type: POST_UPDATE_START });
export const postUpdateSuccess = payload => ({ payload, type: POST_UPDATE_SUCCESS });
export const postUpdateError = payload => ({ payload, type: POST_UPDATE_ERROR });

/* thunk creators */
export const fetchAllPosts = () => {
  return (dispatch, getState) => {
    dispatch(fetchPostsStarted());

    Axios
      .get(`http://localhost:8000/api/posts`)
      .then(res => {
        dispatch(fetchPostsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchPostsError(err.message || true));
      });
  };
};

export const fetchPost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchPostStarted());

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchPostSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchPostError(err.message || true));
      });
  };
};

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

    case FETCH_POST_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_POST_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: statePart.data.map(e => e.id === action.payload.id ? action.payload : e),
      };
    }
    case FETCH_POST_ERROR: {
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
            _id: action.payload._id,
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
      };
    }
    case POST_UPDATE_SUCCESS: {
      return {
        ...statePart,
        data: statePart.data.map(post => post.id === action.payload.id ? 
          {
            _id: action.payload._id,
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
      };
    }
    default:
      return statePart;
  }
};
