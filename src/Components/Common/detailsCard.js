import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import * as detailsCardStyles from '../../styles/detailsCard.css';
import RoomIcon from '@material-ui/icons/Room';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        fontFamily: 'Cinzel Decorative !important',
        // backgroundColor: '#519dd4',
        color: '#fff',
        borderRadius: '10px 10px 10px 10px',
        boxShadow:
            '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        borderBottom: '1px solid #c5d8e6',
    },
}));

const Details = (details) => {
    return (
        <div className={detailsCardStyles.address}>
            <h5>{details.address}</h5>
            <h5>{details.city}</h5>
            <h5>{details.state}</h5>
            <h5>{details.zipcode}</h5>
            <h5>{details.phone}</h5>
        </div>
    );
};

const TotalPriceLabel = () => {
    return <h5 className={detailsCardStyles.typo}>Total price</h5>;
};

const AddressLabel = () => {
    return <h5 className={detailsCardStyles.typo}>Address</h5>;
};
const PriceValue = (totalPrice) => {
    return <h5 className={detailsCardStyles.typo}>₹ {totalPrice}</h5>;
};

export default function CheckoutDetails({ totalPrice, details }) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={detailsCardStyles.avatar}>{/* <ImageIcon /> */}₹</Avatar>
                </ListItemAvatar>
                <ListItemText
                    className={detailsCardStyles.typo}
                    primary={TotalPriceLabel()}
                    secondary={PriceValue(totalPrice)}
                />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={detailsCardStyles.avatar}>
                        <RoomIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    className={detailsCardStyles.typo}
                    primary={AddressLabel()}
                    secondary={Details(details)}
                />
            </ListItem>
        </List>
    );
}
