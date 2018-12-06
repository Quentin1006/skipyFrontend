import React, { Component } from 'react';

import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

class DiscussionThumbnailTemp extends Component {
    onHandleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const { close } = this.props;
        close();
    }


    render() {
        return (
            <div className="thumbnail__wrapper">
            <div style={{width:"70px"}}></div>
            <div className="thumbnail__text">
                <div className="thumbnail__new-message v-center">{"Nouveau Message"}</div>
            </div>
            <div className="thumbnail__close v-center set-right">
                <IconButton onClick={this.onHandleClick}>
                    <CloseIcon/>
                </IconButton>
            </div>
        
        </div>
        );
    }
}


export default DiscussionThumbnailTemp;