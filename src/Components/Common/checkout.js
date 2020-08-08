import React, { useState, useEffect } from 'react';
import Footer from './footer';
import GoBack from './goBack';
import * as checkoutStyles from '../../styles/checkoutStyles.css';
import { connect } from 'react-redux';
import { savedFavListSelector } from '../../Services/selectors';
import { Link, withRouter } from 'react-router-dom';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import { removeItemFromFavRequest } from '../../Services/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CheckoutDetails from './detailsCard';
import SuccessIcon from '../../assets/images/gifone.gif';

const states = [
    {
        value: 'Andhra Pradesh',
        label: 'Andhra Pradesh',
    },
    {
        value: 'Telangana',
        label: 'Telangana',
    },
    {
        value: 'Tamilnadu',
        label: 'Tamilnadu',
    },
    {
        value: 'Others',
        label: 'Others',
    },
];

function Checkout({
    savedFavList,
    dispatchFetchItemData,
    itemDetails,
    dispatchRemoveItemFromFavList,
}) {
    const [currentStep, setCurrentStep] = useState('items');
    const [selectedItemsList, setSelectedItemsList] = useState([]);
    const [details, setDetails] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);

    const [state, setState] = React.useState('AP');

    const handleChange = (event) => {
        setState(event.target.value);
    };
    // const checkCurrentStep = () => {
    //     return currentStep;
    // };
    console.log('savedFavList in Checkout', savedFavList);
    const handleSubmit = () => {
        console.log('huu');
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(
            'data',
            data.get('address'),
            data.get('phone'),
            data.get('city'),
            data.get('zipcode'),
            data.get('state'),
        );
        setDetails({
            address: data.get('address'),
            phone: data.get('phone'),
            city: data.get('city'),
            zipcode: data.get('zipcode'),
            state: data.get('state'),
        });
        setCurrentStep('placeOrder');
    };

    const getTotalPrice = () => {
        const totalPrice = priceArray.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10));
        setTotalPrice(totalPrice);
        setCurrentStep('address');
    };

    // const updatePrice = (price) => {
    //     console.log('updating price');
    //     const updatedTotalPrice = totalPrice + price;
    //     setTotalPrice(updatedTotalPrice);
    // };

    const priceArray = [];

    const fetchItemDetailsApi = (itemId) => {
        const currentElementInStore = itemDetails
            ? itemDetails.filter((element) => element.id.toString() == itemId)
            : [];
        priceArray.push(currentElementInStore[0].price.metalPricePerGm);

        console.log('priceArray', priceArray);

        // useEffect(() => {
        // updatePrice(currentElementInStore[0].price.metalPricePerGm);
        // setTotalPrice(totalPrice + currentElementInStore[0].price.metalPricePerGm);

        // }, []);

        return (
            <div className={checkoutStyles.listItem}>
                <Link
                    to={{
                        pathname: '/item',
                        itemId: itemId,
                    }}
                >
                    <div className={checkoutStyles.img}>
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

                <div className={checkoutStyles.itemDetailsTile}>
                    <Grid container spacing={12}>
                        <Grid item xs={10}>
                            <Link
                                to={{
                                    pathname: '/item',
                                    itemId: itemId,
                                }}
                            >
                                <div className={checkoutStyles.itemDetailsName}>
                                    <h5>
                                        {currentElementInStore.length
                                            ? currentElementInStore[0].name
                                            : dispatchFetchItemData(itemId)}
                                    </h5>
                                </div>
                                <div className={checkoutStyles.itemDetailsPrice}>
                                    {/* {setTotalPrice(
                                        totalPrice + currentElementInStore[0].price.metalPricePerGm,
                                    )} */}
                                    {/* {priceArray.push(
                                        currentElementInStore[0].price.metalPricePerGm,
                                    )} */}
                                    ₹{' '}
                                    {currentElementInStore.length
                                        ? currentElementInStore[0].price.metalPricePerGm
                                        : dispatchFetchItemData(itemId)}
                                </div>
                            </Link>
                        </Grid>

                        <Grid item xs={2}>
                            <HighlightOffOutlinedIcon
                                className={checkoutStyles.itemDeleteIcon}
                                title="Delete item"
                                onClick={() => dispatchRemoveItemFromFavList(itemId)}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    };

    return (
        <div>
            {/* <div>
                <GoBack />
            </div> */}
            <div className={checkoutStyles.main}>
                {/* <div className={checkoutStyles.checkoutTitle}>
                    <h4>Checkout</h4>
                </div> */}

                <div className={checkoutStyles.title}>
                    {/* <GoBack className={favoriteStyles.back} /> */}
                    <div className={checkoutStyles.back}>
                        <GoBack />
                    </div>
                    <h4>Checkout</h4>
                </div>

                {/* <div className={checkoutStyles.stepBar}>Progress tracker</div> */}
                {currentStep === 'items' ? (
                    <div className={checkoutStyles.currentStep}>
                        <div className={checkoutStyles.reviewItems}>
                            <div className={checkoutStyles.itemsList}>
                                Items List
                                {savedFavList.map((element) => {
                                    console.log('element', element);
                                    return fetchItemDetailsApi(element);
                                })}
                            </div>
                        </div>
                        <div className={checkoutStyles.bottomActions}>
                            {/* <button onClick={() => setCurrentStep('address')}>Confirm Items</button> */}
                            <Button
                                onClick={() => getTotalPrice()}
                                className={checkoutStyles.checkoutBtn}
                                variant="contained"
                            >
                                Confirm Items
                            </Button>
                            <h5 className={checkoutStyles.bottomNotes1}>
                                Please add/review your address at next step{' '}
                            </h5>
                        </div>
                    </div>
                ) : null}

                {currentStep === 'address' ? (
                    <div className={checkoutStyles.currentStep}>
                        <div className={checkoutStyles.reviewItems}>
                            <div className={checkoutStyles.itemsList}>
                                Add your details
                                <div className={checkoutStyles.addressForm}>
                                    <form
                                        className={checkoutStyles.form}
                                        noValidate
                                        autoComplete="off"
                                        onSubmit={() => handleSubmit()}
                                    >
                                        <TextField
                                            className={checkoutStyles.addressField}
                                            id="outlined-multiline-static"
                                            label="Address"
                                            placeholder="House no. & Streetname"
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            name="address"
                                        />
                                        <div>
                                            <TextField
                                                className={checkoutStyles.cityPhone}
                                                required
                                                id="outlined-required"
                                                label="Mobile Number"
                                                type="number"
                                                // InputLabelProps={{
                                                //     shrink: true,
                                                // }}
                                                placeholder="+91"
                                                helperText="Safe, we won't spam you"
                                                variant="outlined"
                                                max-length="11"
                                                name="phone"
                                            />
                                            <TextField
                                                className={checkoutStyles.cityPhone}
                                                required
                                                id="outlined-required"
                                                label="City"
                                                variant="outlined"
                                                name="city"
                                            />
                                        </div>

                                        <div>
                                            <TextField
                                                className={checkoutStyles.zipState}
                                                required
                                                id="outlined-required"
                                                label="Zipcode"
                                                type="number"
                                                variant="outlined"
                                                name="zipcode"
                                            />
                                            <TextField
                                                className={checkoutStyles.zipState}
                                                id="outlined-select-state"
                                                select
                                                label="Select"
                                                value={state}
                                                onChange={handleChange}
                                                variant="outlined"
                                                name="state"
                                            >
                                                {states.map((option) => (
                                                    <MenuItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </div>
                                        <Button
                                            // onClick={() => setCurrentStep('placeOrder')}
                                            className={checkoutStyles.checkoutBtn}
                                            variant="contained"
                                            type="submit"
                                        >
                                            Confirm Address
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div>
                            {/* <button onClick={() => setCurrentStep('placeOrder')}>
                                Confirm Address
                            </button> */}
                            {/* <Button
                                // onClick={() => setCurrentStep('placeOrder')}
                                className={checkoutStyles.checkoutBtn}
                                variant="contained"
                            >
                                Confirm Address
                            </Button> */}
                            <h5>Place your order at next step</h5>
                        </div>
                    </div>
                ) : null}

                {currentStep === 'placeOrder' ? (
                    <div className={checkoutStyles.currentStep}>
                        <div className={checkoutStyles.reviewItems}>
                            <div className={checkoutStyles.itemsList}>
                                <h5>Review Details & Submit</h5>
                                <CheckoutDetails totalPrice={totalPrice} details={details} />

                                {/* {totalPrice}
                                {details.address}
                                {details.city}
                                {details.zipcode}
                                {details.state}
                                {details.phone} */}
                            </div>
                        </div>
                        <div>
                            <Button
                                onClick={() => setCurrentStep('finish')}
                                className={checkoutStyles.checkoutBtn}
                                variant="contained"
                            >
                                Place order
                            </Button>
                            {/* <button onClick={() => setCurrentStep('finish')}>Place order</button> */}
                            {/* <h5>Please add/review your address </h5> */}
                        </div>
                    </div>
                ) : null}

                {currentStep === 'finish' ? (
                    <div className={checkoutStyles.currentStep}>
                        <div className={checkoutStyles.reviewItems}>
                            <div className={checkoutStyles.itemsList}>
                                <h5 className={checkoutStyles.orderSuccess}>
                                    Thanks, you've placed your order successfully.
                                    <br />
                                    We'll contact you through WhatsApp
                                </h5>
                                <img src={'/assets/images/gifone.gif'} width="100%" />
                                {/* <img src={SuccessIcon} /> */}
                                {/* <img src="https://gatesbbq.com/wp-content/uploads/2017/04/checkmarksuccess.gif" /> */}
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    savedFavList: savedFavListSelector(state) ? savedFavListSelector(state) : [],
    itemDetails: state.itemDetails ? state.itemDetails : [],
});

const mapDispatchToProps = (dispatch) => ({
    // dispatchFetchItemData: (itemId) => {
    //     dispatch(fetchItemDetailsRequest(itemId));
    // },
    dispatchRemoveItemFromFavList: (itemId) => {
        // console.log('dispatchRemoveItemFromFavList', itemId);
        dispatch(removeItemFromFavRequest(itemId));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
