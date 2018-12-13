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
    },

    errorWrapper: {
        fontSize: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        margin: "80px",
        textAlign: "center"
    }
};


class WebcamRenderer extends Component {
    state = {
        streaming: false,
        stream: null,
        hasPermission: false

    };


    componentDidMount() {
        const permissions = { video: true };
        this.startWebcam(permissions);
        
    }

    componentDidUpdate(){
        console.log(this.state.hasPermission)
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
            this.setState({hasPermission: true, streaming: true})
            return stream;
        })
        .then(stream => {
            this.video.srcObject = stream;
            this.setState({stream});
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
        console.log("err in WebcamRenderer: ", err);
        this.setState({hasPermission: false})
        this.props.onError(); 
    };

    renderError = () => {
        const { classes } = this.props;
        return (
                <div className={classes.errorWrapper}>
                    <div>
                        Please allow the use of the camera in Browser settings 
                        to take a picture
                    </div>
                </div>
        )
    }

    renderWebcam = () => {
        const { classes } = this.props;
        return (
           <div>
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
        )
    }

    
    render() {
        const { classes } = this.props;
        const { hasPermission } = this.state;
        return (

            <div className={classes.cameraWrapper}>
                {
                    hasPermission 
                    ? this.renderWebcam()
                    : this.renderError()
                }
            </div>
        );
    }
}

WebcamRenderer.defaultProps = {
    onTakeScreenshot: () => {},
    onAcceptCamera: () => {},
    onError: () => {}
};


WebcamRenderer.propTypes = {
    onTakeScreenshot: PropTypes.func
};

export default withStyles(styles)(WebcamRenderer);
