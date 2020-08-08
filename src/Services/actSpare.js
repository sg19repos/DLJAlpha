import {
    FETCH_ITEM_DETAILS_REQUEST,
    SAVE_ITEM_DETAILS_SUCCESS,
    FETCH_ITEM_DETAILS_FAILURE,
    SAVE_CAT_ROUTE_REQUEST,
    SAVE_CAT_ROUTE_SUCCESS,
    SAVE_ITEM_TO_FAV_REQUEST,
    SAVE_ITEM_TO_FAV_SUCCESS,
    SAVE_ITEM_ROUTE_REQUEST,
    SAVE_ITEM_ROUTE_SUCCESS,
} from './actionTypes';

export const fetchItemDetailsRequest = (itemId) => {
    // console.log('itemId', itemId);
    return {
        type: FETCH_ITEM_DETAILS_REQUEST,
        payload: itemId,
    };
};

export const saveItemDetailsSuccess = (itemDetails, fetchedItems) => {
    // console.log('inSuccess', itemDetails, fetchedItems);
    return {
        type: SAVE_ITEM_DETAILS_SUCCESS,
        // payload: fetchedItems ? [itemDetails, fetchedItems] : [itemDetails],
        payload: fetchedItems ? [itemDetails, fetchedItems] : [itemDetails],
    };
};

export const fetchItemDetailsFailure = (errorMessage) => {
    return {
        type: FETCH_ITEM_DETAILS_FAILURE,
        payload: errorMessage,
    };
};

export const saveCatRouteRequest = (routeParams) => {
    // console.log('routeParams', routeParams);
    return {
        type: SAVE_CAT_ROUTE_REQUEST,
        payload: routeParams,
    };
};

export const saveCatRouteSuccess = (lastSavedRoute) => {
    // console.log('lastSavedRoute', lastSavedRoute);
    return {
        type: SAVE_CAT_ROUTE_SUCCESS,
        payload: lastSavedRoute,
    };
};

export const saveItemToFavRequest = (itemId) => {
    // console.log('itemId in saveFavActions', itemId);
    return {
        type: SAVE_ITEM_TO_FAV_REQUEST,
        payload: itemId,
    };
};

export const saveItemRouteRequest = (location) => {
    return {
        type: SAVE_ITEM_ROUTE_REQUEST,
        payload: location,
    };
};

export const saveItemRouteSuccess = (lastItemRoute) => {
    return {
        type: SAVE_ITEM_ROUTE_SUCCESS,
        payload: lastItemRoute,
    };
};

export const saveItemToFavSuccess = (itemId, fetchedItems) => {
    console.log('testit', itemId);
    // debugger;
    let favList = !localStorage.getItem('favList')
        ? []
        : JSON.parse(localStorage.getItem('favList')).length > 1
        ? JSON.parse(localStorage.getItem('favList'))
        : [JSON.parse(localStorage.getItem('favList'))[0]];
    // debugger;
    itemId ? favList.push(itemId.toString()) : null;
    // debugger;
    console.log('favList before parse', favList);
    localStorage.setItem('favList', JSON.stringify(favList));
    console.log('favList in action success', favList, localStorage.getItem('favList'));
    return {
        type: SAVE_ITEM_TO_FAV_SUCCESS,
        payload: fetchedItems ? [favList, fetchedItems] : [favList],
    };
};
