import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import "./Message.css";

const styles = {

}

class ImageMessage extends Component {

    renderImage = (image) => {
        const { onHandleLoad, onHandleClick } = this.props;
        const { src } = image;
        return (
            <a href=" #" dataid={image.id} onClick={onHandleClick}>  
                <div>
                    <img 
                        src={src} 
                        className={"message__image"} 
                        alt="message upload"
                        onLoad={onHandleLoad}
                    />
                </div>
            </a>
        )
    }


    render() {
        const { imgs } = this.props;
        return (
            <div className="message__container message__images-container">            
                {
                    imgs.map(img => (
                        <div key={img.id} className={"message__image-wrapper"}>
                            {this.renderImage(img)} 
                        </div>
                    ))
                }
            </div>
        );
    }
}

ImageMessage.propTypes = {
    imgs : PropTypes.array.isRequired
};

export default withStyles(styles)(ImageMessage);