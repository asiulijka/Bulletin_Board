export const initialState = {
  user: {
    data: {
      _id: 2,
      email: 'jo@test.com',
      type: 'user',
      isLoggedIn: true,
    },
    loading: {
      active: false,
      error: false,
    },
  },
  posts: {
    data: [],
    loading: {
      active: false,
      error: false,
    },
  },
};
