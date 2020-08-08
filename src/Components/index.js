import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    fetchItemDetailsRequest,
    saveItemToFavSuccess,
    saveItemToFavRequest,
    fetchFavListRequest,
} from '../Services/actions';
import { lastCatRouteSelector, favListSelector } from '../Services/selectors';
import { FormattedMessage } from 'react-intl';
import coreStyles from '../styles/styles.css';
import SwitchLanguages from './switchLanguage';
import { makeStyles } from '@material-ui/core/styles';
import Home from '../Components/Common/home';

function DLJHome({
    itemData,
    dispatchItemData,
    handleSwitch,
    selectedLanguage,
    dispatchSetInitialFavList,
}) {
    // useEffect(() => {
    //     dispatchItemData();
    // }, []);

    useEffect(() => {
        dispatchSetInitialFavList();
    }, []);

    return (
        <div className={coreStyles.mainContent}>
            {/* <SwitchLanguages
                style={{ transform: "translate('50%, -50%')" }}
                handleSwitch={handleSwitch}
                selectedLanguage={selectedLanguage}
            /> */}
            {/* <FormattedMessage id="greeting" /> */}
            <Home />
        </div>
    );
}
const mapStateToProps = (state) => (
    console.log('hitting state in index'),
    {
        itemData: lastCatRouteSelector(state),
    }
);

const mapDispatchToProps = (dispatch) => ({
    dispatchItemData: () => {
        dispatch(fetchItemListRequest());
    },
    dispatchSetInitialFavList: () => {
        console.log('savingItemsToFav in index');
        // dispatch(saveItemToFavSuccess());
        dispatch(saveItemToFavRequest());
        // dispatch(fetchFavListRequest());
    },
});

DLJHome.propTypes = {
    itemData: PropTypes.arrayOf(PropTypes.array),
    dispatchItemData: PropTypes.func.isRequired,
    handleSwitch: PropTypes.func,
    selectedLanguage: PropTypes.string,
};

DLJHome.defaultProps = {
    itemData: undefined,
    selectedLanguage: 'en',
    handleSwitch: undefined,
};

export default connect(mapStateToProps, mapDispatchToProps)(DLJHome);
