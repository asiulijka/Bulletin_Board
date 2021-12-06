import React from 'react';
import { shallow } from 'enzyme';
import { HeaderComponent } from './Header';

describe('Component Header', () => {
  it('should render without crashing', () => {
    const sampleUser = {
      id: 'test_id',
      email: 'test_email',
      type: 'test_type',
      isLoggedIn: true,
    };
    const component = shallow(<HeaderComponent user={sampleUser} />);
    expect(component).toBeTruthy();
  });
});
