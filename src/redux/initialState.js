export const initialState = {
  user: {
    data: {
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
    data: [
      {
        id: 'gfdhfgn',
        title: 'Test Title #1',
        description: 'Test description #1',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: 'test_img_1.jpg',
        price: 123,
        phone: 601123123,
        location: 'Earth'
      },
      {
        id: '154512485',
        title: 'Test Title #2',
        description: 'Test description #2',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: 'test_img_2.jpg',
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
        photo: 'test_img_3.jpg',
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
