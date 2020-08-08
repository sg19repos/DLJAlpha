import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import itemData from './mockData.json';

var mock = new MockAdapter(axios);
// !localStorage.getItem('mockData')
//     ? localStorage.setItem('mockData', JSON.stringify(mockData))
//     : null;
// const itemList = localStorage.getItem('mockData');
const fetchItemDetailsApi = {
    async fetchItemData(url) {
        // console.log('url', url);
        // console.log('itemData.itemData', itemData.itemData);
        mock.onGet(url).reply(200, {
            // itemData: itemData.itemData[1],
            itemData: itemData.itemData.filter((item) => item.id.toString() == url),
        });
        // console.log('response in mock', response);
        // console.log('listData', listData);
        const response = await axios.get(url).then(function (response) {
            console.log('response', response ? response.data.itemData[0] : []);
            return response.data.itemData ? response.data.itemData[0] : JSON.parse(itemData);
        });

        return response;
    },
};

export default fetchItemDetailsApi;
