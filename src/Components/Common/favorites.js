import React, { useState, useEffect } from 'react';
import * as favoriteStyles from '../../styles/favoriteStyles.css';
import Footer from './footer';
import GoBack from './goBack';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { itemDetailsSelector, favListSelector } from '../../Services/selectors';
import fetchItemDetailsApi from '../../Services/api';
import {
    fetchItemDetailsRequest,
    saveItemToFavSuccess,
    fetchFavListRequest,
    saveItemToFavRequest,
    removeItemFromFavRequest,
} from '../../Services/actions';
import { saveItemToFavReduer } from '../../Services/reducers';
import { pure } from 'recompose';
import { EmptyBox } from '../../assets/images/icon_emptybox.jpg';

function Favorites({
    savedFavList,
    itemDetails,
    dispatchFetchItemData,
    dispatchFetchFavList,
    dispatchRemoveItemFromFavList,
}) {
    // console.log('inFavs', favList.favList ? favList.favList : '');
    console.log('inFavs', savedFavList);
    const [currentElementDetails, setCurrentElementDetails] = useState([]);
    const history = useHistory();
    useEffect(() => {
        console.log('initial loading', savedFavList);
    }, []);
    useEffect(() => {
        debugger;
        dispatchFetchFavList();
    }, []);

    // console.clear();
    // console.log('favList', favList, itemDetails);
    const fetchItemDetailsApi = (itemId) => {
        console.log('itemId', itemId, 'itemDetails', itemDetails);
        // console.log(
        //     'something',
        //     itemDetails.itemDetails.filter((element) => element.id.toString() == itemId),
        // );

        // return setCurrentElementDetails(

        const currentElementInStore = itemDetails
            ? itemDetails.filter((element) => element.id.toString() == itemId)
            : [];
        console.log('currentElementInStore', currentElementInStore);

        // const currentElementInStore = [
        //     {
        //         id: 1001,
        //         name: 'Nomination ring',
        //         category: 'jewellery',
        //         subCategory: 'bracelets',
        //         itemImage: '#',
        //         price: {
        //             metalPricePerGm: '2000',
        //         },
        //     },
        // ];
        return (
            // <div>
            //     {currentElementInStore.length
            //         ? currentElementInStore[0].name
            //         : dispatchFetchItemData(itemId)}
            // </div>

            <div className={favoriteStyles.listItem}>
                <Link
                    to={{
                        pathname: '/item',
                        itemId: itemId,
                    }}
                    // onClick={() => history.push('/item?id=item1')}
                >
                    {/* <img className={favoriteStyles.img} src="#" alt="image" /> */}
                    <div className={favoriteStyles.img}>
                        <img
                            src={
                                currentElementInStore.length
                                    ? currentElementInStore[0].itemImage
                                    : dispatchFetchItemData(itemId)
                            }
                            alt="image"
                        />
                    </div>
                </Link>

                <div className={favoriteStyles.itemDetailsTile}>
                    <Grid container spacing={12}>
                        <Grid item xs={10}>
                            <Link
                                to={{
                                    pathname: '/item',
                                    itemId: itemId,
                                }}
                                // onClick={() => history.push('/item?id=item1')}
                            >
                                <div className={favoriteStyles.itemDetailsName}>
                                    {/* Ring */}
                                    {/* {console.log(
                                        'fetchItemDetailsApi(favElement)',
                                        fetchItemDetailsApi(favElement),
                                    )} */}
                                    {/* {fetchItemDetailsApi(favElement)[0].name} */}
                                    {/* {currentElementDetails.name} */}
                                    <div>
                                        {currentElementInStore.length
                                            ? currentElementInStore[0].name
                                            : dispatchFetchItemData(itemId)}
                                    </div>
                                </div>
                                <div className={favoriteStyles.itemDetailsPrice}>
                                    ₹{' '}
                                    {currentElementInStore.length
                                        ? currentElementInStore[0].price.metalPricePerGm
                                        : dispatchFetchItemData(itemId)}
                                </div>
                            </Link>
                        </Grid>

                        <Grid item xs={2}>
                            <HighlightOffOutlinedIcon
                                className={favoriteStyles.itemDeleteIcon}
                                title="Delete item"
                                onClick={() => dispatchRemoveItemFromFavList(itemId)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
        // );
    };

    return (
        <>
            <div>
                {/* <div className={favoriteStyles.back}> */}
                {/* <GoBack /> */}
                {/* </div> */}

                <div className={favoriteStyles.main}>
                    <div className={favoriteStyles.title}>
                        {/* <GoBack className={favoriteStyles.back} /> */}
                        <div className={favoriteStyles.back}>
                            <GoBack />
                        </div>
                        <h4>Your favorite items</h4>
                        <Button className={favoriteStyles.checkoutBtn} variant="contained">
                            <Link to="/checkout">Checkout</Link>
                        </Button>
                    </div>
                    <div className={favoriteStyles.list}>
                        {/* {console.log('favList', favList)} */}
                        {savedFavList.length > 0 ? (
                            savedFavList.map((favElement) =>
                                //   (favElement) => {
                                //   console.log('favElement', favElement),
                                //       fetchItemDetailsApi(favElement);
                                //   },
                                favElement
                                    ? fetchItemDetailsApi(favElement)
                                    : //   <div className={favoriteStyles.listItem}>
                                      //       <Link
                                      //           to={{
                                      //               pathname: '/item',
                                      //               search: `?id=item1`,
                                      //           }}
                                      //           onClick={() => history.push('/item?id=item1')}
                                      //       >
                                      //           <img
                                      //               className={favoriteStyles.img}
                                      //               src="#"
                                      //               alt="image"
                                      //           />
                                      //       </Link>

                                      //       <div className={favoriteStyles.itemDetailsTile}>
                                      //           <Grid container spacing={10}>
                                      //               <Grid item xs={8}>
                                      //                   <div
                                      //                       className={favoriteStyles.itemDetailsName}
                                      //                   >
                                      //                       {/* Ring */}
                                      //                       {/* {console.log(
                                      //                               'fetchItemDetailsApi(favElement)',
                                      //                               fetchItemDetailsApi(favElement),
                                      //                           )} */}
                                      //                       {/* {fetchItemDetailsApi(favElement)[0].name} */}
                                      //                       {/* {currentElementDetails.name} */}
                                      //                       {fetchItemDetailsApi(favElement)}
                                      //                   </div>
                                      //                   <div
                                      //                       className={
                                      //                           favoriteStyles.itemDetailsPrice
                                      //                       }
                                      //                   >
                                      //                       $200
                                      //                   </div>
                                      //               </Grid>

                                      //               <Grid item xs={2}>
                                      //                   <HighlightOffOutlinedIcon />
                                      //               </Grid>
                                      //           </Grid>
                                      //       </div>
                                      //   </div>
                                      null,
                            )
                        ) : (
                            <div>
                                <h4 className={favoriteStyles.emptyFavListMessage}>
                                    Your wishlist is empty. <br />
                                    Please add some to checkout
                                </h4>
                                <img
                                    src="/assets/images/icon_emptybox.jpg"
                                    width="100%"
                                    alt="Empty wishlist"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

// const mapStateToProps = (state) => ({
//     itemDetails: itemDetailsSelector(state) ? itemDetailsSelector(state).itemDetails : null,
// });

const mapStateToProps = (state) => (
    // console.log('hitting state', state),
    console.log('hitting state', state),
    {
        // favList: favListSelector(state) ? favListSelector(state) : [],
        savedFavList: state.savedFavList,
        itemDetails: state.itemDetails ? state.itemDetails : [],
    }
);

const mapDispatchToProps = (dispatch) => ({
    dispatchFetchItemData: (itemId) => {
        // console.log('dipatching fetchItemData in fav', itemId),
        dispatch(fetchItemDetailsRequest(itemId));
    },
    dispatchFetchFavList: () => {
        // console.log('savingItemsToFav in favs');
        // dispatch(saveItemToFavSuccess());
        dispatch(saveItemToFavRequest());
        dispatch(fetchFavListRequest());
    },
    dispatchRemoveItemFromFavList: (itemId) => {
        // console.log('dispatchRemoveItemFromFavList', itemId);
        dispatch(removeItemFromFavRequest(itemId));
    },
});

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Favorites));
export default pure(connect(mapStateToProps, mapDispatchToProps)(Favorites));
