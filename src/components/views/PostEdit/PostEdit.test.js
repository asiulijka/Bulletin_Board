import React from 'react';
import { shallow } from 'enzyme';
import { PostEditComponent } from './PostEdit';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Component PostEdit', () => {
  it('should render without crashing', () => {
    const samplePost = {
      id: 'test_id',
      title: 'test_title',
      description: 'test_description',
      published: 'test_published',
      actualised: 'test_actualised',
      email: 'test_email',
      userId: 'test_userId',
      status: 'test_status',
      photo: 'test_attachment',
      price: 'test_price',
      phone: 'test_phone',
      location: 'test_location',
    };
    const sampleUser = {
      id: 'test_id',
      email: 'test_email',
      type: 'test_type',
      isLoggedIn: true,
    };
    const component = shallow(<PostEditComponent postDetails={samplePost} user={sampleUser} />);
    expect(component).toBeTruthy();
  });
});
