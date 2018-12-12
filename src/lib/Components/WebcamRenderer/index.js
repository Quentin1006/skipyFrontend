import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";


const styles = {
  cameraBtn: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)"
  },
  cameraWrapper: {
    position: "relative",
    height:"100%",
    width:"100%"
  },

  cameraVideo: {
    width: "100%",
    height: "100%"
  }
};


class WebcamRenderer extends Component {
    state = {
        permissionDenied: false,
        streaming: false,
        stream: null

    };


    componentDidMount() {
        const permissions = { video: true };
        this.startWebcam(permissions);
    }


    componentWillUnmount(){
        this.closeStream();
    }


    onHandleClick = (e) => {
        const { onTakeScreenshot } = this.props;
        

        const canvas = document.createElement("canvas");
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        canvas.getContext('2d').drawImage(this.video, 0, 0);

        const img = canvas.toDataURL('image/webp');
        
        onTakeScreenshot(img);
    }


    startWebcam = (permissions) => {
        const { onAcceptCamera } = this.props;
        if (!this._hasGetUserMedia()) return;

        navigator.mediaDevices
        .getUserMedia(permissions)
        .then(stream => {
            this.video.srcObject = stream;
            this.setState({streaming: true, stream });
            onAcceptCamera();
        })
        .catch(this._errBack);
    }


    closeStream = () => {
        const { stream } = this.state;
        stream && stream.getTracks().forEach(track => track.stop())
    }


    _hasGetUserMedia = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };


    _errBack = err => {
        console.log(err);
        // if(err.match("Permission denied")){
        //     this.setState({permissionDenied: true});
        // }
        
    };

    
    render() {
        const { classes } = this.props;
        return (

            <div className={classes.cameraWrapper}>
                <video
                autoPlay
                ref={videoTag => {
                    this.video = videoTag;
                }}
                className={classes.cameraVideo}
                >
                Your browser doesn't support the use of a Webcam
                </video>
                <Fab 
                    color="primary" 
                    aria-label="capture" 
                    className={classes.cameraBtn} 
                    onClick={() => this.onHandleClick()}
                >
                    <PhotoCameraIcon />
                </Fab>

            </div>
        );
    }
}

WebcamRenderer.defaultProps = {
    onTakeScreenshot: () => {}
};


WebcamRenderer.propTypes = {
    onTakeScreenshot: PropTypes.func
};

export default withStyles(styles)(WebcamRenderer);
