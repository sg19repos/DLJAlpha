import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InteractiveList from '../Components/listItems';

Enzyme.configure({ adapter: new Adapter() });
describe('Component: ListOutItems should load items', () => {
    // const listDetails = ['income1', 'House Rent', 5];
    // const id = '1';
    // const handleDelete = () => {};

    it('renders a list with items in it', () => {
        const listDetails = ['income1', 'House Rent', 5];
        const id = '1';
        const handleDelete = () => {};
        const wrapper = mount(
            <InteractiveList listDetails={listDetails} id={id} handleDelete={() => handleDelete} />,
        );
        // console.warn('wrapper', wrapper.debug());
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
