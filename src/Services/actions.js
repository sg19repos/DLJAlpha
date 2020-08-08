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
    FETCH_FAVLIST_REQUEST,
    FETCH_FAVLIST_SUCCESS,
    REMOVE_ITEM_FROM_FAV_REQUEST,
    REMOVE_ITEM_FROM_FAV_SUCCESS,
    REMOVE_ITEM_FROM_FAV_FAILURE,
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
        payload: fetchedItems ? fetchedItems : itemDetails,
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
    let favList = !localStorage.getItem('favList')
        ? []
        : JSON.parse(localStorage.getItem('favList'));
    // console.log('favList', favList);
    itemId ? favList.push(itemId) : null;
    // console.log('favList after pushing', favList);
    localStorage.setItem('favList', JSON.stringify(favList));
    return {
        type: SAVE_ITEM_TO_FAV_REQUEST,
        payload: favList.length > 0 && itemId ? favList : favList,
    };
};

export const saveItemRouteRequest = (location) => {
    console.log('location in saveItemRouteRequest', location);
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

export const saveItemToFavSuccess = (itemId) => {
    console.log('testit', itemId);
    // debugger;
    // let favList =
    //     !localStorage.getItem('favList') && !localStorage.getItem('favList').length < 1
    //         ? []
    //         : JSON.parse(localStorage.getItem('favList')).length > 0
    //         ? JSON.parse(localStorage.getItem('favList'))
    //         : [JSON.parse(localStorage.getItem('favList'))[0]];
    // debugger;
    // console.log(
    //     'favList',
    //     favList,
    //     JSON.parse(localStorage.getItem('favList')),
    //     JSON.parse(localStorage.getItem('favList')),
    // );
    // itemId ? favList.push(itemId.toString()) : null;
    // debugger;
    // console.log('favList before parse', favList);
    // localStorage.setItem('favList', JSON.stringify(favList));
    // console.log('favList in action success', favList, localStorage.getItem('favList'));
    return {
        type: SAVE_ITEM_TO_FAV_SUCCESS,
        // payload: fetchedItems ? favList : fetchedItems,
        payload: itemId,
    };
};

export const fetchFavListRequest = () => {
    // console.log('fetching favs');
    return {
        type: FETCH_FAVLIST_REQUEST,
    };
};

export const fetchFavListSuccess = (favList) => {
    console.log('favList', favList);
    return {
        type: FETCH_FAVLIST_SUCCESS,
        payload: favList,
    };
};

export const removeItemFromFavRequest = (itemId) => {
    console.log('removing from favlist action');
    const updatedFavList = JSON.parse(localStorage.getItem('favList')).filter(
        (item) => item !== itemId,
    );
    localStorage.setItem('favList', JSON.stringify(updatedFavList));
    return {
        type: REMOVE_ITEM_FROM_FAV_REQUEST,
        payload: itemId,
    };
};

export const removeItemFromFavSuccess = (updatedFavList) => {
    return {
        type: REMOVE_ITEM_FROM_FAV_SUCCESS,
        payload: updatedFavList,
    };
};
