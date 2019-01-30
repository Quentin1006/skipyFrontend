import React from 'react';
import { withStyles } from '@material-ui/core/styles';


const defaultHeight = 100;

const styles = theme => ({
    container: {
        display: "flex",
        width: "100%",
        height: defaultHeight,
        border: "1px solid #dbdcde",
        backgroundColor: "#fff",
        margin: 7,
        /*boxShadow: "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"*/
    },
    content: {
        flex: "1 1 auto"
    },
    imgWrapper: {
        flexFlow: "row nowrap",
        
        marginRight: 5
        
    },

    imgAvatarRounded: {
        borderRadius: "50%",
        margin:20,
    }
})

const ThumbnailImage = ({imageSrc, imageAlt, square, children, height, containerCss, classes}) => {
    const imgClass = square ? "" : classes.imgAvatarRounded;
    return (
        <div className={`${classes.container} ${containerCss}`}>
            <div className={classes.imgWrapper} style={{flex: `0 0 ${height}px`}}>
                <img 
                    src={imageSrc} 
                    alt={imageAlt} 
                    className={`${classes.img} ${imgClass}`}
                    width={height}
                    height={height}
                />
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    )

}


ThumbnailImage.defaultProps = {
    imageAlt: "avatar",
    square: "false",
    height: defaultHeight,
    containerCss: ""
}

export default withStyles(styles)(ThumbnailImage)