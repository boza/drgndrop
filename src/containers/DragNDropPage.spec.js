import React from 'react';
import {shallow} from 'enzyme';
import {DragNDropPage} from './DragNDropPage';
import {Column} from './Column';

describe('<DragNDropPage />', () => {
  it('should contain <Column />', () => {
    const actions = {};
    const columnsCount = {};
    const wrapper = shallow(<FuelSavingsPage actions={actions} columnsCount={2}/>);

    expect(wrapper.find(Column).length).toEqual(2);
  });
});
