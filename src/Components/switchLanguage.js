import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FormattedMessage } from 'react-intl';

const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

export default function SwitchLanguages({ handleSwitch, selectedLanguage }) {
    const [alignment, setAlignment] = useState(localStorage.getItem('localValue'));

    const handleAlignment = (event, newAlignment) => {
        handleSwitch(event.currentTarget.value);
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const classes = useStyles();

    return (
        <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
                <div className={classes.toggleContainer}>
                    <span>
                        <FormattedMessage id="switchMessage" />:{' '}
                    </span>

                    <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="en" aria-label="en aligned">
                            en
                        </ToggleButton>
                        <ToggleButton value="fr" aria-label="fr">
                            fr
                        </ToggleButton>
                        <ToggleButton value="it" aria-label="it aligned">
                            it
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </Grid>
        </Grid>
    );
}

SwitchLanguages.propTypes = {
    handleSwitch: PropTypes.func,
    selectedLanguage: PropTypes.string,
};

SwitchLanguages.defaultProps = {
    selectedLanguage: 'en',
    handleSwitch: undefined,
};
