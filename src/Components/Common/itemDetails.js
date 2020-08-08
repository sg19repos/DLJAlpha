import React, { useState, useEffect } from 'react';
import * as itemDetailStyles from '../../styles/itemDetailStyles.css';
import Footer from './footer';
import ItemTopHeader from './itemTopHeader';
import {
    fetchItemDetailsRequest,
    saveItemToFavRequest,
    saveItemRouteRequest,
    removeItemFromFavRequest,
} from '../../Services/actions';
import { connect } from 'react-redux';
import {
    itemDetailsSelector,
    lastItemRouteSelector,
    savedFavListSelector,
} from '../../Services/selectors';
import { Link, useHistory } from 'react-router-dom';
import * as heartStyles from '../../styles/heart.css';
// import handleFavClick from "../../services/setFavorites";
import CategoryIcon from '@material-ui/icons/Category';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import { WhatsappShareButton } from 'react-share';
import { WhatsappIcon } from 'react-share';

function ItemDetails({
    location,
    dispatchFetchItemData,
    itemDetails,
    dispatchSaveItemToFav,
    dispatchLastItemRoute,
    lastItemRoute,
    savedFavList,
    dispatchRemoveItemFromFavList,
}) {
    // console.clear();
    const history = useHistory();
    try {
        console.log('itemDetails', itemDetails);
        console.log('location', location);
        console.log('lastItemRoute', lastItemRoute);

        const currentLocation =
            lastItemRoute && lastItemRoute.itemId == location.itemId
                ? lastItemRoute
                : location.itemId
                ? location
                : lastItemRoute;
        // lastItemRoute && lastItemRoute.itemId == location.itemId ? lastItemRoute : lastItemRoute;
        // lastItemRoute && lastItemRoute.itemId ? lastItemRoute : location;
        // lastItemRoute && lastItemRoute.itemId == location.itemId ? location : lastItemRoute;
        // location;

        console.log('currentLocation', currentLocation);

        useEffect(() => {
            // console.log('initiate dispatch');
            dispatchFetchItemData(currentLocation.itemId);
            dispatchLastItemRoute(currentLocation);
        }, []);
        // console.clear();
        // console.log('itemDetails', itemDetails ? itemDetails : 'not found');

        const favStatus = !savedFavList.includes(currentLocation.itemId)
            ? heartStyles.heart
            : `${heartStyles.heart} ${heartStyles.isActive}`;

        console.log('favStatus', favStatus, savedFavList);

        // const [fav, setFav] = useState(heartStyles.heart);
        const [fav, setFav] = useState(favStatus);
        // const [fav, setFav] = useState(
        //     !savedFavList.includes(currentLocation.itemId) ? heartStyles.heart : heartStyles.isActive,
        // );
        console.log('fav', fav);
        const heart = heartStyles.heart;
        const handleSaveFav = (itemId) => {
            // fav === 'heart' ? setFav('heart is-active') : setFav('heart');
            // console.log('fav', fav);
            fav === heartStyles.heart
                ? (setFav(`${heartStyles.heart} ${heartStyles.isActive}`),
                  dispatchSaveItemToFav(itemId))
                : (setFav(heartStyles.heart), dispatchRemoveItemFromFavList(itemId));
            // const action = fav === 'heart' ? 'addFav' : null;
            // handleFavClick(imgModelNo, action);
            // dispatchSaveItemToFav(itemId);
        };

        const currentItem = itemDetails
            ? // ? itemDetails.filter((element) => (element ? element.id === currentLocation.itemId : null))
              itemDetails.filter((element) =>
                  element
                      ? element.id === (lastItemRoute ? lastItemRoute.itemId : location.itemId)
                      : null,
              )[0]
            : null;

        console.log('currentItem', currentItem);
        return (
            <>
                {currentItem
                    ? (console.log(currentItem),
                      (
                          <>
                              <ItemTopHeader itemHeaderName={itemDetails.name} />
                              <div className={itemDetailStyles.main}>
                                  <div className={itemDetailStyles.imageContent}>
                                      <img src={currentItem.itemImage} />
                                      {/* <img src="/assets/images/icon_wedding1.png" /> */}
                                  </div>
                                  <div className={itemDetailStyles.itemTitle}>
                                      <h5>{currentItem.name}</h5>
                                  </div>
                                  <div className={itemDetailStyles.price}>
                                      {/* <label>Price: </label> */}
                                      <h4>
                                          <span>₹</span>
                                          {currentItem.price.metalPricePerGm}
                                      </h4>
                                  </div>
                                  <div className={itemDetailStyles.actions}>
                                      {/* <div className={itemDetailStyles.addToFav}>
                            <div
                                className={fav}
                                onClick={() => handleSaveFav(itemDetailStyles.id)}
                            ></div>
                        </div>
                        <div className={itemDetailStyles.share}>Share</div> */}

                                      <Grid item>
                                          <ButtonGroup
                                              size="large"
                                              aria-label="large outlined secondary button group"
                                          >
                                              <Fab
                                                  variant="extended"
                                                  style={{ backgroundColor: '#ffffff' }}
                                              >
                                                  <Link
                                                      to={{
                                                          pathname: '/categories',
                                                          id: itemDetailStyles.id,
                                                          name: itemDetailStyles.name,
                                                          catType: 'subcats',
                                                          title: itemDetailStyles.title,
                                                      }}
                                                      // onClick={() =>
                                                      //     history.push('/categories?name=' + itemCategory)
                                                      // }
                                                  >
                                                      <CategoryIcon />
                                                  </Link>
                                              </Fab>

                                              <Fab
                                                  variant="extended"
                                                  style={{ backgroundColor: '#ffffff' }}
                                              >
                                                  <div
                                                      className={fav}
                                                      onClick={() => handleSaveFav(currentItem.id)}
                                                  ></div>
                                              </Fab>
                                              <Fab
                                                  variant="extended"
                                                  style={{ backgroundColor: '#ffffff' }}
                                              >
                                                  <WhatsappShareButton
                                                      url={':: ' + window.location.href}
                                                      title={`Hey there! Check it out`}
                                                  >
                                                      <WhatsappIcon size={32} round={true} />
                                                  </WhatsappShareButton>
                                              </Fab>
                                          </ButtonGroup>
                                      </Grid>
                                  </div>
                              </div>
                          </>
                      ))
                    : ''}
                <Footer />
            </>
        );
    } catch (error) {
        history.push('/home');
        window.location.reload();
    }
}

const mapStateToProps = (state) => ({
    itemDetails: itemDetailsSelector(state) ? itemDetailsSelector(state) : null,
    lastItemRoute: lastItemRouteSelector(state) ? lastItemRouteSelector(state).lastItemRoute : null,
    savedFavList: savedFavListSelector(state) ? savedFavListSelector(state) : [],
});

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchItemData: (itemId) => {
        dispatch(fetchItemDetailsRequest(itemId));
    },
    dispatchSaveItemToFav: (itemId) => {
        dispatch(saveItemToFavRequest(itemId));
    },
    dispatchLastItemRoute: (currentLocation) => {
        dispatch(saveItemRouteRequest(currentLocation));
    },
    dispatchRemoveItemFromFavList: (itemId) => {
        console.log('dispatchRemoveItemFromFavList', itemId);
        dispatch(removeItemFromFavRequest(itemId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemDetails);
