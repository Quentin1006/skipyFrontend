import React from "react";
import PropTypes from "prop-types";

import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import Fab from "@material-ui/core/Fab";


const Webcam = React.forwardRef((props, ref) => (
    <>
        <video
            autoPlay
            ref={ref}
            style={{
                width: "100%",
                height: "100%"
            }}
        >
        Your browser doesn't support the use of a Webcam
        </video>
        <Fab 
            color="primary" 
            aria-label="capture" 
            style={{
                position: "absolute",
                bottom: "20px",
                left: "50%",
                transform: "translateX(-50%)"
            }} 
            onClick={props.takeScreenshot}
        >
            <PhotoCameraIcon />
        </Fab>
    </>
))


Webcam.propTypes = {
    takeScreenshot: PropTypes.func.isRequired,
}


export default Webcam;