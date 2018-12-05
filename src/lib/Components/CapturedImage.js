import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";

const styles = theme => ({
    wrapper: {
        width: "100%",
        height:"100%",
        position: "relative"
    },

    img: {
        height:"100%",
        width:"100%"
    },
    btns: {
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)"
    },
    fab: {
        margin: theme.spacing.unit,
    },

})

class CapturedImage extends Component {
    render() {
        const { src, onAccept, onCancel, classes } = this.props;
        return (
            <div className={classes.wrapper}>
                <img src={src} alt="capture" className={classes.img}/> 
                <div className={classes.btns}>
                    <Fab variant="extended" color="secondary" aria-label="accept" className={classes.fab} onClick={onAccept}>
                        KEEP
                    </Fab>

                    <Fab variant="extended"  aria-label="refuse" className={classes.fab} onClick={onCancel}>
                        TAKE ANOTHER
                    </Fab>
                </div>
            </div>
        );
    }
}

CapturedImage.propTypes = {
    src: PropTypes.string.isRequired, 
    onAccept: PropTypes.func.isRequired, 
    onCancel: PropTypes.func.isRequired
};

export default withStyles(styles)(CapturedImage);