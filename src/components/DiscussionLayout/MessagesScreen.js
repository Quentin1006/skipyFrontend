import React, { Component } from 'react';


import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { format, formatDistance} from 'date-fns';
import { fr } from 'date-fns/locale';
import Message from "./MessagesScreen/Message";


import "./MessagesScreen.css"

class MessagesScreen extends Component {
    render() {
        const { messages, user, friend } = this.props;

        
        const listOfMessages = messages.map(mess => {

            
            const timestamp = parseInt(mess.date, 10);
            const side = user.id === mess.from ? "right" : "left";
            const tooltipPlacement = side === "right" ? "left" : "right";
            const localeDate = format(timestamp, 'dd/MM/YYY HH:MM', {locale:fr});
            const distTime = formatDistance(timestamp, Date.now());
            return (
                <li className={`message__row message--align-${side}`} key={mess.id}>
                    <div className="message__time-distance">
                        
                    </div>
                    <div className="message__container">
                        <a href=" #">
                            <OverlayTrigger 
                                overlay={<Tooltip id={mess.id}>{localeDate}</Tooltip>} 
                                placement={tooltipPlacement}
                            >
                                <div>
                                    <Message 
                                        content={mess.content}
                                        date={mess.date}
                                    />    
                                </div>

                            </OverlayTrigger>
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


                
            </div>
        );
    }
}

export default MessagesScreen;