import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = {
    imgPreview: {
        backgroundColor: "#000",
        maxWidth: "100%",
        maxHeight: "100%",
        position: "relative",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"

    }
}

class PreviewImage extends Component {
    render() {
        const { src, width, height, alt, className,  classes } = this.props;
        return (
            <div className={className} style={{width:width, height:height}}>
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