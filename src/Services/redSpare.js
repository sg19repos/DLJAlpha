import { combineReducers } from 'redux';
import {
    SAVE_ITEM_DETAILS_SUCCESS,
    SAVE_CAT_ROUTE_SUCCESS,
    SAVE_ITEM_TO_FAV_SUCCESS,
    SAVE_ITEM_ROUTE_SUCCESS,
} from './actionTypes';

const deducePayload = (action) => {
    return action.payload;
};
// function itemDataReducer(state = null, action) {
function itemDataReducer(state = null, action) {
    console.log('state', state, action);
    switch (action.type) {
        case SAVE_ITEM_DETAILS_SUCCESS:
            return { ...state, itemDetails: [...state.itemDetails, action.payload] };
        default:
            return state;
    }
}

function lastCatRouteReduer(state = null, action) {
    switch (action.type) {
        case SAVE_CAT_ROUTE_SUCCESS:
            return { lastCatRoute: deducePayload(action) };
        default:
            return state;
    }
}

// function saveItemToFavReduer(state = localStorage.getItem('favList').split(','), action) {
// function saveItemToFavReduer(state = null, action) {
function saveItemToFavReduer(state = { favList: [] }, action) {
    // console.log('action in saveItemToFavReduer', action);
    switch (action.type) {
        case SAVE_ITEM_TO_FAV_SUCCESS:
            return { favList: deducePayload(action) };
        default:
            return state;
    }
}

function lastItemRouteReducer(state = null, action) {
    switch (action.type) {
        case SAVE_ITEM_ROUTE_SUCCESS:
            return {
                lastItemRoute: deducePayload(action),
            };
        default:
            return state;
    }
}

const itemCategoryReducer = combineReducers({
    itemDetails: itemDataReducer,
    lastCatRoute: lastCatRouteReduer,
    favList: saveItemToFavReduer,
    lastItemRoute: lastItemRouteReducer,
});

export default itemCategoryReducer;
