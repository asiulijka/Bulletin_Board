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
        id: '123',
        title: 'Neque porro quisquam est qui dolorem ipsum quia...',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: 'https://images.pexels.com/photos/10281406/pexels-photo-10281406.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 600,
        phone: 601123123,
        location: 'Earth'
      },
      {
        id: '12345',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec efficitur.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: 'https://images.pexels.com/photos/5270341/pexels-photo-5270341.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        price: 15,
        phone: null,
        location: null
      },
      {
        id: '1234567',
        title: 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        published: "2021-12-03",
        actualised: "2021-12-04",
        email: 'jo@test.com',
        status: 'published',
        photo: '',
        price: null,
        phone: null,
        location: 'Somewhere Nearby'
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
};
