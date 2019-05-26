import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MenuItem } from "@material-ui/core";
import MenuAction from "./MenuAction";
import NotificationCard from "../../lib/Components/Cards/NotificationCard"
import { withSocketConsumer } from '../SocketContext/SocketContext';



class MenuNotifications extends Component {
    render() {
        const { open , anchorEl, onClose, notifications } = this.props;
        return (
            <MenuAction
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
            >
                {notifications.map(notification => (
                    <NotificationCard
                        key={notification.id}
                        {...notification}
                    />
                ))}
            </MenuAction>
        );
    }
}

MenuNotifications.defaultProps = {
    notifications: [
        {
            id: 1,
            content: "I am a notification, but a very very long one",
            date: Date.now() - 300000,
            from: {
                profilpic: "https://www.shareicon.net/data/128x128/2016/08/18/809170_user_512x512.png",
            },
            seen: false,
        },
        {
            id: 2,
            content: "I am another notif",
            date: Date.now() - 30000000,
            from: {
                profilpic: "https://www.featurepics.com/FI/Thumb/20170730/Gentle-Man-Raises-His-Hat-4509961.jpg",
            },
            seen: false,
        }
    ]
}

MenuNotifications.propTypes = {
    open: PropTypes.bool,
    anchorEl: PropTypes.instanceOf(Element),
    onClose: PropTypes.func,
    notifications: PropTypes.array
};

export default withSocketConsumer(["notifications"])(MenuNotifications);