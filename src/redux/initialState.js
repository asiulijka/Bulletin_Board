export const initialState = {
  user: {
    data: {
      isLoggedIn: true,
    },
    loading: {
      active: false,
      error: false,
    },
  },
  posts: {
    data: [
      {
        id: 'gfdhfgn',
        title: 'Test Title #1',
        description: 'Test description #1',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: null,
        price: null,
        phone: null,
        location: null
      },
      {
        id: '154512485',
        title: 'Test Title #2',
        description: 'Test description #2',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: null,
        price: null,
        phone: null,
        location: null
      },
      {
        id: 'szhfbxn',
        title: 'Test Title #3',
        description: 'Test description #3',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: null,
        price: null,
        phone: null,
        location: null
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
