import React from 'react';
import { shallow } from 'enzyme';
import { HomepageComponent } from './Homepage';

describe('Component Homepage', () => {
  it('should render without crashing', () => {
    const sampleUser = {
      id: 'test_id',
      email: 'test_email',
      type: 'test_type',
      isLoggedIn: true,
    };
    const component = shallow(<HomepageComponent allPosts={[]} user={sampleUser} />);
    expect(component).toBeTruthy();
  });
});
