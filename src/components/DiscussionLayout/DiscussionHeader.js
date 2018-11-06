import React, { Component } from 'react';

import { Glyphicon } from "react-bootstrap";
import "./DiscussionHeader.css";


class DiscussionHeader extends Component {
    render() {
        return (
            <div className="discussion-header__wrapper">
                <div></div>
                <div className="discussion-header__exchange">
                    <Glyphicon glyph="refresh" />
                </div>
                <div></div>
            </div>
        );
    }
}

export default DiscussionHeader; 