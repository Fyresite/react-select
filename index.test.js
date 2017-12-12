import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Select from './dist/Select';

const div = document.createElement('div');

it('renders without crashing', () => {
  ReactDOM.render(
    <Select />
  , div);
});