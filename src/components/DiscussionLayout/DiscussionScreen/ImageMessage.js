import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "./Message.css";

class ImageMessage extends Component {

    renderImage = (image) => {
        const { onHandleClick } = this.props;
        const { src } = image;
        return (
            <a href=" #" dataid={image.id} onClick={onHandleClick}>  
                <div  className={"message__image-wrapper"}>
                    <img src={src} className={"message__image"} alt="message upload"/>
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
                        <div key={img.id}>
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

export default ImageMessage;