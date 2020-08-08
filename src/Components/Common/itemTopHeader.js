import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GoBack from './goBack';
import * as topHeaderStyles from '../../styles/topHeaderStyles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paperBack: {
        padding: theme.spacing(1.5),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        boxShadow: 'none',
    },
    paperTitle: {
        padding: theme.spacing(2),
        textAlign: 'center',
        // color: theme.palette.text.secondary,
        color: '#b89366',
        fontWeight: 700,
        boxShadow: 'none',
    },
}));

export default function ItemTopHeader({ itemHeaderName }) {
    // console.clear();
    // console.log('itemHeaderDetails', itemHeaderName);
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={0} className={topHeaderStyles.containerItem}>
                <Grid item xs={1} className={topHeaderStyles.backButton}>
                    <Paper className={classes.paperBack}>
                        <GoBack type="line" />
                    </Paper>
                </Grid>
                <Grid item xs={11} className={topHeaderStyles.titleItem}>
                    <Paper className={classes.paperTitle}>{itemHeaderName}</Paper>
                </Grid>
                {/* <Grid item xs>
                    <Paper className={classes.paper}>xs</Paper>
                </Grid> */}
            </Grid>
        </div>
    );
}
