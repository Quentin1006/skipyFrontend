import React, { Component } from 'react';

import CloseIcon from "@material-ui/icons/Close";

class DiscussionThumbnailTemp extends Component {
    render() {
        const { close } = this.props;
        return (
            <div className="thumbnail__wrapper">

            <div className="thumbnail__profilepicture">
            </div>
            <div className="thumbnail__text">
                <div className="thumbnail__new-message v-center">{"Nouveau Message"}</div>
            </div>
            <div className="thumbnail__close v-center set-right">
                <CloseIcon onClick={close}/>
            </div>
        
        </div>
        );
    }
}


export default DiscussionThumbnailTemp;