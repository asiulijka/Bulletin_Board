import Axios from 'axios';

/* selectors */
export const getAllPosts = ({posts}) => posts.data;
export const getPublishedPosts = ({posts}) => posts.data.filter(e => e.published !== null);
export const getPostsLoadingState = ({posts}) => posts.loading;
export const getPostDetails = ({posts}, postId) => posts.data.filter(e => e._id === postId)[0];
export const getUserPosts = ({posts, user}) => {
  if (user.data.type !== 'admin'){
    return posts.data.filter(e => e.email === user.data.email);
  } else {
    return posts.data;
  }
};
export const getUser = ({user}) => user.data;

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_PUBLISHED_POSTS_START = createActionName('FETCH_PUBLISHED_POSTS_START');
const FETCH_PUBLISHED_POSTS_SUCCESS = createActionName('FETCH_PUBLISHED_POSTS_SUCCESS');
const FETCH_PUBLISHED_POSTS_ERROR = createActionName('FETCH_PUBLISHED_POSTS_ERROR');

const FETCH_USER_POSTS_START = createActionName('FETCH_USER_POSTS_START');
const FETCH_USER_POSTS_SUCCESS = createActionName('FETCH_USER_POSTS_SUCCESS');
const FETCH_USER_POSTS_ERROR = createActionName('FETCH_USER_POSTS_ERROR');

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
export const fetchPublishedPostsStarted = payload => ({ payload, type: FETCH_PUBLISHED_POSTS_START });
export const fetchPublishedPostsSuccess = payload => ({ payload, type: FETCH_PUBLISHED_POSTS_SUCCESS });
export const fetchPublishedPostsError = payload => ({ payload, type: FETCH_PUBLISHED_POSTS_ERROR });

export const fetchUserPostsStarted = payload => ({ payload, type: FETCH_USER_POSTS_START });
export const fetchUserPostsSuccess = payload => ({ payload, type: FETCH_USER_POSTS_SUCCESS });
export const fetchUserPostsError = payload => ({ payload, type: FETCH_USER_POSTS_ERROR });

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
    dispatch(fetchPublishedPostsStarted());

    Axios
      .get(`http://localhost:8000/api/posts`)
      .then(res => {
        dispatch(fetchPublishedPostsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchPublishedPostsError(err.message || true));
      });
  };
};

export const fetchUserPosts = (userEmail) => {
  return (dispatch, getState) => {
    dispatch(fetchUserPostsStarted());

    Axios
      .get(`http://localhost:8000/api/user/${userEmail}/posts`)
      .then(res => {
        dispatch(fetchUserPostsSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchUserPostsError(err.message || true));
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

    Axios
      .post(`http://localhost:8000/api/posts`, post)
      .then(res => {
        dispatch(postAddSuccess(res.data));
      })
      .catch(err => {
        dispatch(postAddError(err.message || true));
      });
  };
};

export const updatePost = post => {
  return (dispatch, getState) => {
    dispatch(postUpdateStarted());

    Axios
      .put(`http://localhost:8000/api/posts`, post)
      .then(res => {
        dispatch(postUpdateSuccess(res.data));
      })
      .catch(err => {
        dispatch(postUpdateError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_PUBLISHED_POSTS_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_PUBLISHED_POSTS_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_PUBLISHED_POSTS_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case FETCH_USER_POSTS_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_USER_POSTS_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_USER_POSTS_ERROR: {
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
        data: statePart.data.map(e => e._id === action.payload._id ? action.payload : e),
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

    case POST_ADD_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
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
    case POST_ADD_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }

    case POST_UPDATE_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case POST_UPDATE_SUCCESS: {
      return {
        ...statePart,
        data: statePart.data.map(post => post._id === action.payload._id ? 
          {
            title: action.payload.title,
            description: action.payload.description,
            published: action.payload.published,
            actualised: action.payload.actualised,
            email: action.payload.email,
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
    case POST_UPDATE_ERROR: {
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
