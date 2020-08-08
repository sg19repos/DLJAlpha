import { combineReducers } from 'redux';
import {
    SAVE_ITEM_DETAILS_SUCCESS,
    SAVE_CAT_ROUTE_SUCCESS,
    SAVE_ITEM_TO_FAV_SUCCESS,
    SAVE_ITEM_ROUTE_SUCCESS,
    FETCH_FAVLIST_SUCCESS,
    REMOVE_ITEM_FROM_FAV_SUCCESS,
} from './actionTypes';

const deducePayload = (action) => {
    return action.payload;
};

const itemExists = (items, item) => {
    debugger;
    return items.some((element) => element.id === item.id);
};
function itemDataReducer(state = [], action) {
    console.log('action in itemDataReducer', action);
    switch (action.type) {
        case SAVE_ITEM_DETAILS_SUCCESS:
            // return [...state, Object.assign({}, action.payload)];
            // return action.payload;
            console.log(
                'itemExists(state, action.payload)',
                itemExists(state, action.payload),
                [...state, action.payload],
                'state',
                state,
                'action.payload',
                action.payload,
            );
            if (itemExists(state, action.payload)) {
                return state;
            } else {
                return [...state, action.payload];
            }
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
function saveItemToFavReducer(state = [], action) {
    console.log('action in saveItemToFavReduer', action);
    switch (action.type) {
        case SAVE_ITEM_TO_FAV_SUCCESS:
            // return { favList: deducePayload(action) };
            // return [...state, Object.assign({}), action.payload];
            // return [...state, Object.assign({}), action.payload];
            // return [...state, action.payload];
            return action.payload;
        case FETCH_FAVLIST_SUCCESS:
            // return [...state, Object.assign({}), action.payload];
            // console.log('[...state, action.payload]', [...state, action.payload]);
            // return [...state];
            return action.payload;
        case REMOVE_ITEM_FROM_FAV_SUCCESS:
            return action.payload;
        default:
            console.log('came in s2f');
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

// function fetchFavListReducer(state = null, action) {
//     console.log('action', action);
//     switch (action.type) {
//         case FETCH_FAVLIST_SUCCESS:
//             // return [...state, Object.assign({}), action.payload];
//             return [...state, action.payload];
//         default:
//             return state;
//     }
// }

const itemCategoryReducer = combineReducers({
    itemDetails: itemDataReducer,
    lastCatRoute: lastCatRouteReduer,
    savedFavList: saveItemToFavReducer,
    // favList: fetchFavListReducer,
    lastItemRoute: lastItemRouteReducer,
});

export default itemCategoryReducer;
