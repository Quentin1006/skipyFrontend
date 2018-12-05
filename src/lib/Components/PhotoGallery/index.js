import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Lightbox from "react-images";


const styles = {
    container: {}
}



class PhotoGallery extends Component {
    state={
        current: this.props.photoInit
    }


    goToNext = () => {
        this.setState(state => ({...state, current: state.current+1}));
    }


    goToPrev = () => {
        this.setState(state => ({...state, current: state.current-1}));
    }


    goToImage = (idx) => {
        this.setState({
            current: idx
        })
    }


    renderPhotoGallery = () => {
        const { images, onClose, classes } = this.props;
        const { current } = this.state;
            return (
                <div className={classes.container}>
                    <Lightbox 
                        images= {images}
                        currentImage={current}
                        onClose={onClose}
                        onClickNext= {this.goToNext} 
                        onClickPrev= {this.goToPrev}
                        onClickThumbnail={this.goToImage}
                        isOpen={true}
                        showThumbnails= {true}
                        backdropClosesModal={true}
                        showImageCount={false}
                        
                    />
                </div>
                
            );
    }

    render() {
        return (
            this.renderPhotoGallery()
        )
    }
}

PhotoGallery.propTypes = {
    images : PropTypes.array.isRequired
};

PhotoGallery.defaultProps = {
    showStatus: false,
    showIndicators: false,
    useKeyboardArrows: true,
    infiniteLoop: true
}

export default withStyles(styles)(PhotoGallery);