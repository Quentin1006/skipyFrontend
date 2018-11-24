import React, { Component } from 'react';


import Tooltip from '@material-ui/core/Tooltip';
import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import Message from "./DiscussionScreen/Message";


import "./DiscussionScreen.css";


const LEFT = "left";
const RIGHT = "right";

const setToOppositeSide = (side) => {
    return side === LEFT ? RIGHT : LEFT;
}

const setFormatedDate = (timestamp, locale=fr) => {
    const now = Date.now();
    const dateFormat = isSameDay(now, timestamp) ? "HH:MM" : "dd/MM/YYY HH:MM";
    return format(timestamp, dateFormat, {locale});
}

class DiscussionScreen extends Component {

    componentDidMount() {
        this.scrollToBottom();
      }
      
      componentDidUpdate() {
        this.scrollToBottom();
      }


    scrollToBottom = (behavior="auto") => {
        this.messagesEnd.scrollIntoView({ behavior});
    }

    
    render() {
        const { messages=[], user, discId } = this.props;

        const listOfMessages = messages.map(mess => {

            const timestamp = parseInt(mess.date, 10);
            const side = user.id === mess.from ? RIGHT : LEFT;
            const tooltipPlacement = setToOppositeSide(side);
            const localeDate = setFormatedDate(timestamp);
            //const distTime = formatDistance(timestamp, Date.now());
            return (
                <li className={`message__row message--align-${side}`} key={`${discId}:${mess.id}`}>
                    <div className="message__time-distance">
                        
                    </div>
                    <div className="message__container">
                        <a href=" #">
                            <Tooltip title={localeDate} placement={tooltipPlacement}>
                                <Message>
                                    {mess.content}
                                </Message>
                            </Tooltip>
                        </a>
                    </div>
                    
                </li>
            )
        });

        return (
            <div className="messagescreen__wrapper">
                <ul className="messagescreen__list">
                    {listOfMessages}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>


                
            </div>
        );
    }
}

export default DiscussionScreen;