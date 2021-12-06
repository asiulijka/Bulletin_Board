import React from 'react';
import { shallow } from 'enzyme';
import { MyPostsComponent } from './MyPosts';

describe('Component MyPosts', () => {
  it('should render without crashing', () => {
    const sampleUser = {
      id: 'test_id',
      email: 'test_email',
      type: 'test_type',
      isLoggedIn: true,
    };
    const component = shallow(<MyPostsComponent myPosts={[]} user={sampleUser} />);
    expect(component).toBeTruthy();
  });
});
