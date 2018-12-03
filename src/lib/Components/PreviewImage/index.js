import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/HighlightOff';

const styles = {
    imgPreview: {
        backgroundColor: "#000",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    closeBtn: {
        position: "absolute",
        top: "0",
        right: "0",
        padding: "0",
        transform: "translate(50%, -50%)",
        zIndex: "1000",
        color: "#fff",
        backgroundColor: "#7d7777"
    },
    imgPreviewWrapper: {
        position: "relative"
    }
}

class PreviewImage extends Component {

    onHandleClick = () => {
        const { closePreview, id } = this.props;
        closePreview(id);
    }

    
    render() {
        const { src, width, height, alt, className, classes } = this.props;
        return (
                
                <div className={`${classes.imgPreviewWrapper} ${className}`} style={{width:width, height:height}}>
                    <IconButton 
                        className={classes.closeBtn} 
                        aria-label="delete" 
                        color="primary"
                        onClick={this.onHandleClick}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img 
                        className={classes.imgPreview} 
                        src={src} 
                        alt={alt}
                    />
                </div>
        );
    }
}

PreviewImage.propTypes = {
    src : PropTypes.string.isRequired
};

PreviewImage.defaultProps = {
    alt: "",
    width: 80,
    height: 120

}

export default withStyles(styles)(PreviewImage);