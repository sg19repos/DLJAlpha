import React from 'react';
import { useHistory } from 'react-router-dom';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';

const GoBack = ({ type }) => {
    const history = useHistory();
    return type === 'line' ? (
        <KeyboardBackspaceRoundedIcon onClick={() => history.goBack()} />
    ) : (
        <ArrowBackIosRoundedIcon onClick={() => history.goBack()} />
    );
};

export default GoBack;
