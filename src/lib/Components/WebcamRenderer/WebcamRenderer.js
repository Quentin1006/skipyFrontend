import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import { CircularProgress, Grow } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";

import CapturedImage from './CapturedImage';
import Webcam from "./Webcam";


const styles = {
    
    cameraWrapper: {
        position: "relative",
        height:"calc(100% - 3px)",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },

    capturedImg: {
        position: "absolute",
        height:"calc(100% - 3px)",
        width:"100%",
        top: 0,
        left: 0,
    },

    errorWrapper: {
        fontSize: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        color: "#fff",
        height:"calc(100% - 3px)",
        width: "100%",
        padding: "80px",
        textAlign: "center"
    },
    
};


class WebcamRenderer extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            isLoading: true,
            streaming: false,
            stream: null,
            hasPermission: false
    
        };
    }
    

    componentDidMount() {
        const permissions = { video: true };
        this.startWebcam(permissions);
        
    }

    componentDidUpdate(prevProps){
        // if(this.video && prevProps.src !== this.props.src){
        //     this.video.srcObject = this.state.stream;
        // }   
    }

    componentWillUnmount(){
        this.closeStream();
    }


    handleTakeScreenshot = () => {
        const { onTakeScreenshot } = this.props;
        
        const canvas = document.createElement("canvas");
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        canvas.getContext('2d').drawImage(this.video, 0, 0);

        const img = canvas.toDataURL('image/webp');
        
        onTakeScreenshot(img);
    }


    startWebcam = (permissions) => {
        if (!this._hasGetUserMedia()) return;

        navigator.mediaDevices
        .getUserMedia(permissions)
        .then(stream => {
            this.setState({hasPermission: true, streaming: true, isLoading: false})
            return stream;
        })
        .then(stream => {
            this.video.srcObject = stream;
            this.setState({stream});
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
        this.setState({hasPermission: false, isLoading: false})
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

    // renderWebcam = () => {
    //     const { classes } = this.props;
    //     return (
    //        <div>
    //            <video
    //             autoPlay
    //             ref={videoTag => {
    //                 this.video = videoTag;
    //             }}
    //             className={classes.cameraVideo}
    //             >
    //             Your browser doesn't support the use of a Webcam
    //             </video>
    //             <Fab 
    //                 color="primary" 
    //                 aria-label="capture" 
    //                 className={classes.cameraBtn} 
    //                 onClick={() => this.onHandleClick()}
    //             >
    //                 <PhotoCameraIcon />
    //             </Fab>
    //        </div>
    //     )
    // }

    renderWebcam = () => {
        const { src, onAccept, onCancel, classes } = this.props;
        const screenshotTaken = src !== null;
        return (
            <>
                <Webcam 
                    ref={videoTag => this.video = videoTag}
                    takeScreenshot={this.handleTakeScreenshot}
                /> 
                {screenshotTaken &&
                <Grow in={screenshotTaken} >
                    <div className={classes.capturedImg}>
                    <CapturedImage 
                        onAccept={onAccept}
                        onCancel={onCancel}
                        src={src || ""}
                    />
                </div>    
                </Grow>}
            </>
        )
    }

    
    render() {
        const {classes } = this.props;
        const { hasPermission, isLoading } = this.state;
        return (


            <div className={classes.cameraWrapper}>
                {isLoading
                ? <CircularProgress />  
                :   hasPermission 
                    ? this.renderWebcam()    
                    : this.renderError()}
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
