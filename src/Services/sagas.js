import { all, call, put, takeEvery, take, select } from 'redux-saga/effects';
import {
    FETCH_ITEM_DETAILS_REQUEST,
    SAVE_CAT_ROUTE_REQUEST,
    SAVE_ITEM_TO_FAV_REQUEST,
    SAVE_ITEM_ROUTE_REQUEST,
    FETCH_FAVLIST_REQUEST,
    REMOVE_ITEM_FROM_FAV_REQUEST,
} from './actionTypes';
import {
    saveItemDetailsSuccess,
    fetchItemDetailsFailure,
    saveCatRouteSuccess,
    saveItemToFavSuccess,
    saveItemRouteSuccess,
    fetchFavListSuccess,
    removeItemFromFavSuccess,
} from './actions';
import fetchItemDetailsApi from './api';
import { itemDetailsSelector, favListSelector, savedFavListSelector } from './selectors';

function* fetchItemData(action) {
    try {
        console.log('action', action);
        const endpoint = 'mockUrl';
        const result = yield call(fetchItemDetailsApi.fetchItemData, action.payload.toString());
        console.log('itemData result', result);
        // console.log('yield select()', yield select());

        /*const fetchedItems = yield select(itemDetailsSelector);
        console.log('fetchedItems', fetchedItems);
        fetchedItems !== null
            ? yield put(saveItemDetailsSuccess(result, ...fetchedItems.itemDetails))
            : yield put(saveItemDetailsSuccess(result));

            */

        yield put(saveItemDetailsSuccess(result));
    } catch (itemFetchError) {
        console.error('Error fetching item data', itemFetchError);
        yield put(fetchItemDetailsFailure(itemFetchError));
    }
}

function* saveCatRouteRequest(action) {
    const lastCatRoute = action.payload;
    try {
        yield put(saveCatRouteSuccess(lastCatRoute));
    } catch (e) {
        console.error('Route saga error', e);
    }
}

function* saveItemToFavRequest(action) {
    // debugger;
    console.log('action in saveItemToFav request', action);
    try {
        const itemId = action.payload;
        // console.log('itemId in saveFavReq', itemId);
        // const existingFavs = yield select(favListSelector);
        // console.log('existingFavs', existingFavs, [itemId]);
        // yield put(saveItemToFavSuccess(existingFavs !== null ? [itemId, existingFavs] : [itemId]));
        console.log('itemId', itemId);
        // itemId.length > 0 ? yield put(saveItemToFavSuccess(itemId)) : null;
        yield put(saveItemToFavSuccess(itemId));
    } catch (saveFavError) {
        console.error('Error occured while saving to fav', saveFavError);
    }
}

function* saveItemRouteRequest(action) {
    const lastItemRoute = action.payload;
    console.log('saveItemRouteRequest sagas', action.payload);
    try {
        yield put(saveItemRouteSuccess(lastItemRoute));
    } catch (itemRouteError) {
        console.warn('Error in saving item last route', itemRouteError);
    }
}

function* fetchFavListRequest() {
    console.log('action 2');
    const existingFavs = yield select(savedFavListSelector);
    console.log('existingFavs', existingFavs);
    try {
        yield put(fetchFavListSuccess(existingFavs));
    } catch (fetchFavError) {
        console.error('Error in fetching favlist', fetchFavError);
    }
}

function* removeItemRequest(action) {
    const existingFavs = yield select(savedFavListSelector);
    const updatedFavList = existingFavs.filter((item) => item !== action.payload);
    console.log('updatedFavList', updatedFavList);
    try {
        yield put(removeItemFromFavSuccess(updatedFavList));
    } catch (removeItemFromFavsError) {
        console.error('Error in removing item from favs', removeItemFromFavsError);
    }
}

function* fetchItemDetails() {
    yield takeEvery(FETCH_ITEM_DETAILS_REQUEST, fetchItemData);
}

function* saveCatRoute() {
    yield takeEvery(SAVE_CAT_ROUTE_REQUEST, saveCatRouteRequest);
}

function* saveItemToFav() {
    yield takeEvery(SAVE_ITEM_TO_FAV_REQUEST, saveItemToFavRequest);
}

function* saveItemRoute() {
    yield takeEvery(SAVE_ITEM_ROUTE_REQUEST, saveItemRouteRequest);
}

function* fetchFavList() {
    yield takeEvery(FETCH_FAVLIST_REQUEST, fetchFavListRequest);
}

function* removeItemFromFav() {
    yield takeEvery(REMOVE_ITEM_FROM_FAV_REQUEST, removeItemRequest);
}

export default function* rootSaga() {
    yield all([
        fetchItemDetails(),
        saveCatRoute(),
        saveItemToFav(),
        saveItemRoute(),
        fetchFavList(),
        removeItemFromFav(),
    ]);
}
