import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../Components/header';

Enzyme.configure({ adapter: new Adapter() });

describe('Header', () => {
    it('Header should load image', () => {
        const wrapper = shallow(<Header />);
        const img = wrapper.find('div img');
        expect(img.prop('src')).toBe('/assets/images/centimelogo.png');
    });
});
