import React from 'react';
import * as footerStyles from '../../styles/footerStyles.css';
import { Link } from 'react-router-dom';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FilterVintageTwoToneIcon from '@material-ui/icons/FilterVintageTwoTone';
import PhoneAndroidTwoToneIcon from '@material-ui/icons/PhoneAndroidTwoTone';
import FavoriteTwoToneIcon from '@material-ui/icons/FavoriteTwoTone';
import FindInPageTwoToneIcon from '@material-ui/icons/FindInPageTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';

const FooterElements = () => {
    return (
        <div className={footerStyles.footerMain}>
            {/* <Link to="/screen1" className={footerStyles.footerItems}>
                <FindInPageTwoToneIcon />
            </Link> */}
            <Link to="/favorites" className={footerStyles.footerItems}>
                <FavoriteTwoToneIcon />
                <h5>Wishlist</h5>
            </Link>
            <Link to="/home" className={footerStyles.footerItems}>
                {/* <HomeTwoToneIcon /> */}
                <FilterVintageTwoToneIcon />
                <h5>Home</h5>
            </Link>
            {/* <Link to="/screen4" className={footerStyles.footerItems}>
                <PhoneAndroidTwoToneIcon />
            </Link> */}
            <Link to="/myaccount" className={footerStyles.footerItems}>
                <AccountCircleTwoToneIcon />
                <h5>Account</h5>
            </Link>
        </div>
    );
};

export default FooterElements;
