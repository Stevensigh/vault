import React from 'react';
import { shallow } from 'enzyme';
import { Switch } from 'react-router';
import Root from 'app/react/root';

describe('Root', () => {
  test('Renders routes container', () => {
    const root = shallow(
      <Root />,
    );

    expect(root.find(Switch).length).toBe(1);
  });
});
