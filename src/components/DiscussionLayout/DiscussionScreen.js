import React, { Component } from 'react';

import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';

import Tooltip from '@material-ui/core/Tooltip';
import Message from "./DiscussionScreen/Message";
import ImageMessage from "./DiscussionScreen/ImageMessage";
import PhotoGallery from "../../lib/Components/PhotoGallery";

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

const messageAdded = (lastCount, newCount) => {
    return lastCount !== newCount
}

class DiscussionScreen extends Component {
    constructor(props){
        super(props);

        this.state = {
            galleryOpened: false,
            images: [],
            photoInit: 0 // the photo idx to open tha gallery at
        }

        this.messagesRendering = null;
    }
    

    componentDidMount() {
        this.scrollToBottom();
        this.messagesRendering = this.renderListOfMessages();
    }
      

    componentDidUpdate(prevProps) {
        const { messages, discId } = this.props;
        this.scrollToBottom();

        if(
            messageAdded(prevProps.messages.length, messages.length)
            || prevProps.discId !== discId
        ){
            this.setState({images: this.getImages()});
        }

        if(prevProps.messages !== messages){
            this.messagesRendering = this.renderListOfMessages();
        }
    }


    onHandleImageClick = (e) => {
        e.preventDefault();

        const imgId = e.currentTarget.getAttribute("dataid");
        this.openGallery(imgId);
    }


    openGallery = (imgId=0) => {
        const { images } = this.state;
        const index = images.findIndex(img => img.id === imgId);
        this.setState(state => ({
            ...state, 
            galleryOpened: true, 
            photoInit:index
        }))
    } 

    closeGallery = () => {
        this.setState({ galleryOpened: false});
    }


    getImages = () => {
        const { messages } = this.props;
        const images = [];

        for(const msg of messages){
            if(!msg.uploads.length > 0)
                continue;
            
            for(const image of msg.uploads){
                images.push(image);
            }
        }

        return images;
    }


    scrollToBottom = (behavior="auto") => {
        this.messagesEnd.scrollIntoView({ behavior});
    }


    renderMessage = (mess, side) => {
        const tooltipPlacement = setToOppositeSide(side);
        const timestamp = parseInt(mess.date, 10);
        const localeDate = setFormatedDate(timestamp);
        const hasImages = mess.uploads.length > 0;

        return (
            <div>
                <div className="message__container">
                    {
                        mess.content &&
                        <Tooltip title={localeDate} placement={tooltipPlacement}>
                            <Message>
                                <div>
                                    {mess.content}  
                                </div>
                                
                            </Message>
                        </Tooltip>
                    }
                </div>
                {
                    hasImages &&
                    <ImageMessage 
                        imgs={mess.uploads} 
                        onHandleClick={this.onHandleImageClick}
                    />
                }
            </div>
        )
    }


    renderListOfMessages = () => {

        const { messages, user, discId } = this.props;
        return (
            messages.map(mess => {
                const side = user.id === mess.from ? RIGHT : LEFT;
                
                //const distTime = formatDistance(timestamp, Date.now());
                return (
                    <li className={`message__row message--align-${side}`} key={`${discId}:${mess.id}`}>
                        <div className="message__time-distance"></div>
                        {this.renderMessage(mess, side)}
                    </li>
                )
            })
        )
    }

    
    render() {
        const { images, galleryOpened, photoInit } = this.state;
        return (
            <div className="messagescreen__wrapper">
                <ul className="messagescreen__list">
                    {this.messagesRendering}
                </ul>
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div> 
                <div>
                    {
                        galleryOpened &&
                        <PhotoGallery 
                            images= {images}
                            onClose= {this.closeGallery}
                            photoInit= {photoInit}
                        />
                    }
                </div>
            </div>
        );
    }
}

DiscussionScreen.defaultProps = {
    messages : []
}


export default DiscussionScreen;