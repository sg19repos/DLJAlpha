import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SankeyChartHome from '../Components/index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { IntlProvider } from 'react-intl';
import messages from '../Core/i18n';
import Header from '../Components/header';
import InteractiveList from '../Components/listItems';
import CreateNewItem from '../Components/createNewItem';

Enzyme.configure({ adapter: new Adapter() });

describe('Sankey Diagram', () => {
    it('Header should load image', () => {
        const wrapper = shallow(<Header />);
        const img = wrapper.find('div img');
        expect(img.prop('src')).toBe('/assets/images/centimelogo.png');
    });
    it('List items component should be loaded in home page', () => {
        const mockStore = configureStore([]);

        const store = mockStore({});
        const wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <SankeyChartHome />
                </IntlProvider>
            </Provider>,
        );

        const listItems = wrapper.find('SankeyChartHome').find('ListOutItems');

        expect(listItems.length).toBe(1);
    });
    it('Listitem component a list with items in it', () => {
        const listDetails = ['income1', 'House Rent', 5];
        const id = '1';
        const handleDelete = () => {};
        const wrapper = mount(
            <InteractiveList listDetails={listDetails} id={id} handleDelete={handleDelete} />,
        );
        expect(wrapper.debug()).toMatchSnapshot();
    });
    it('Add new button should be loaded', () => {
        const mockStore = configureStore([]);

        const store = mockStore({});
        const wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <SankeyChartHome />
                </IntlProvider>
            </Provider>,
        );

        const addNewItemButton = wrapper.find('SankeyChartHome').find('CreateNewItem');
        expect(addNewItemButton.length).toBe(1);
    });
    it('clicking <button> initially opens the dialog', () => {
        const mockStore = configureStore([]);
        const store = mockStore({});
        const wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <CreateNewItem />
                </IntlProvider>
            </Provider>,
        );
        const button = wrapper.find('CreateNewItem').find('button');

        // Test that the button is truthy
        expect(button).toHaveLength(1);

        // Simulation
        button.simulate('click');
        expect(wrapper.find('.MuiDialog-container').length).toBeGreaterThan(0);
    });
    it('Sankey Diagram should be loaded', () => {
        const mockStore = configureStore([]);

        const store = mockStore({});
        const wrapper = mount(
            <Provider store={store}>
                <IntlProvider locale={'en'} messages={messages['en']}>
                    <SankeyChartHome />
                </IntlProvider>
            </Provider>,
        );

        const googleChart = wrapper.find('SankeyChartHome').find('Chart');
        // console.warn('SankeyChartHome', googleChart.debug());
        expect(googleChart.length).toBe(1);
    });
});
