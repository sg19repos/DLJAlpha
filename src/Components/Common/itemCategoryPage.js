import React, { useState, useEffect } from 'react';
import Footer from './footer';
// import { TopBack } from '../../assets/images/catTopBack.jpg';
import * as itemCatStyles from '../../styles/itemCatStyles.css';
import { Link, useHistory } from 'react-router-dom';
import GoBack from './goBack';
import { categories, subCategories } from '../../Services/categories.json';
import { HeaderLogo } from '../../assets/images/icon_earrings3.png';
import { Bracelet } from '../../assets/images/icon_bangles1.png';
import { Chain } from '../../assets/images/icon_pendant1.png';
import { Charms } from '../../assets/images/charms.png';
import { Kada } from '../../assets/images/kada.png';

import { connect } from 'react-redux';
import { element } from 'prop-types';
import { lastCatRouteSelector } from '../../Services/selectors';

function ItemCategory({ location, lastCatRoute }) {
    const history = useHistory();
    try {
        const findCatDetails = () => {
            console.log('lastCatRoute', lastCatRoute);
            return categories.find((element) => element.name === lastCatRoute.name);
        };
        console.log('findCatDetails()', findCatDetails());
        const [currentCat, setCurrentCat] = useState(findCatDetails());
        // const currentSubs = subCategories.filter((subCat) => subCat.parent === {});
        // console.log('location', location);
        // console.log('lastCatRoute', lastCatRoute);
        const currentSubs = subCategories.filter((category) => {
            return category.parentCat == lastCatRoute.name;
        });

        // console.log('currentCat', currentSubs);
        // console.clear();
        // console.log('TopBack', TopBack);
        console.log('currentCat', currentCat);
        return (
            <>
                <div className={itemCatStyles.itemCatMain}>
                    <div
                        className={itemCatStyles.itemCatName}
                        // style={{
                        //     backgroundImage: 'url(/assets/images/catTopBack.jpg)',
                        // }}
                    >
                        {/* <img src="/assets/images/icon_wedding1.png" /> */}

                        <div className={itemCatStyles.back}>
                            <GoBack />
                        </div>

                        <img src={currentCat ? currentCat.image : ''} />
                        <h3>{lastCatRoute.title}</h3>
                        {/* <h3>{lastCatRoute.title}</h3> */}
                        {/* <h3>{location.id}</h3> */}
                    </div>
                    {/* <div className={itemCatStyles.title}>
                        <div className={itemCatStyles.back}>
                            <GoBack />
                        </div>
    
                        <h3>{lastCatRoute.title}</h3>
                    </div> */}
                    <h5 className={itemCatStyles.subCatHeading}>Browse sub categories</h5>
                    {
                        (lastCatRoute.catType = 'cats' ? (
                            <div className={itemCatStyles.subCatList}>
                                {currentSubs.map((currentSub) => (
                                    <div
                                        key={currentSub.id}
                                        className={itemCatStyles.subCatElement}
                                    >
                                        <img
                                            src={
                                                currentSub.image
                                                    ? currentSub.image
                                                    : '/assets/images/icon_earrings3.png'
                                            }
                                            alt={currentSub.title}
                                            width="200px"
                                        />
                                        <h5>{currentSub.title}</h5>
                                    </div>
                                ))}
                            </div>
                        ) : null)
                    }

                    <hr />

                    {/* </div> */}
                    <div className={itemCatStyles.itemCatList}>
                        <Link
                            // to={{
                            //     pathname: '/item',
                            //     search: `?id=item1`,
                            // }}
                            // to={{
                            //     pathname: '/item',
                            //     id: item.id,
                            //     name: item.name,
                            //     title: item.title,
                            // }}
                            to={{
                                pathname: '/item',
                                itemId: 1001,
                            }}
                            // onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_bangles1.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Nomination ring</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>

                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                                itemId: 1002,
                            }}
                            // onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_pendant1.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Item 2 desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 250
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/charms.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Item desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 230
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/kada.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Item desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 270
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={{
                                pathname: '/item',
                                search: `?id=item1`,
                            }}
                            onClick={() => history.push('/item?id=item1')}
                        >
                            <div className={itemCatStyles.itemCatElement}>
                                <div className={itemCatStyles.itemImage}>
                                    {/* <img src="" alt="Image1" /> */}
                                    <img src="/assets/images/icon_earrings3.png" alt="Image1" />
                                </div>
                                {/* <hr /> */}
                                <h5>Image desc</h5>
                                <div className={itemCatStyles.price}>
                                    <h4>
                                        <label>Price: </label>₹ 200
                                    </h4>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    } catch (error) {
        history.push('/home');
        window.location.reload();
    }
}

const mapStateToProps = (state) => (
    console.log('state.lastCatRoute', state),
    {
        lastCatRoute: lastCatRouteSelector(state) ? lastCatRouteSelector(state).lastCatRoute : null,
    }
);

export default connect(mapStateToProps)(ItemCategory);
