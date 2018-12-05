import React, { Component } from 'react';
import { findDOMNode } from "react-dom";


import DiscussionScreen from "./DiscussionLayout/DiscussionScreen";
import DiscussionHeader from "./DiscussionLayout/DiscussionHeader";
import DiscussionActions from "./DiscussionLayout/DiscussionActions";


import { Grid } from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
 



import "./DiscussionLayout.css";

const heightSection = 80;

const styles = theme => ({
    headerContainer: {
        position: "relative",
        width:"100%",
        height:"80px",
        backgroundColor: "#eee",
    },
    gridContainer:{ 
        height:"100%"
    }
  });


class DiscussionLayout extends Component {

    state = {
        headerHeight: heightSection + "px",
        screenHeight: `calc(100% - ${2 * heightSection}px)`,
        inputContainerHeight: heightSection + "px"
    };


    componentDidMount() {
        const screenElement = findDOMNode(this.screen);
        const screenStyles = getComputedStyle(screenElement);
        console.log(screenStyles.height);
        this.setState(state => ({ ...state, screenHeight: screenStyles.height }));
    }


    componentDidUpdate(prevProps) {
        if( prevProps !== this.props){
            const screenElement = findDOMNode(this.screen);
            const screenStyles = getComputedStyle(screenElement);
            this.setState(state => ({ ...state, screenHeight: screenStyles.height }));
        }
    }


    updateHeights = changeOfHeight => {
        console.log("changeOfHeight:", changeOfHeight);
        console.log(
          "updateHeight",
          this.state.screenHeight,
          this.state.inputContainerHeight
        );
        changeOfHeight = parseInt(changeOfHeight, 10);
        const screenHeight =
          parseInt(this.state.screenHeight, 10) - changeOfHeight + "px";
        const inputContainerHeight =
          parseInt(this.state.inputContainerHeight, 10) + changeOfHeight + "px";
    
        /*console.log(
          "screenHeight:",
          screenHeight,
          ", inputContainerHeight:",
          inputContainerHeight
        );*/
        this.setState(state => ({
          ...state,
          screenHeight,
          inputContainerHeight
        }));
      };


    render() {
        const { headerHeight, screenHeight, inputContainerHeight } = this.state;

        const { 
            disc,
            profile,
            openDiscId, 
            markMessagesAsRead, 
            friendlist, 
            onSendMessage,
            fetchMatchingFriends,
            suggestions,
            setNewRecipient,
            isWritingMessage,
            updateWritingMessage,
            classes
        } = this.props;

        const { messages, user, friend } = disc;

        const isTempDisc = String(openDiscId).includes("temp");
       

        return (
            <div className="discussion-layout__container">
                <Grid 
                    direction={"column"} 
                    container 
                    spacing={0} 
                    className={classes.gridContainer}
                >
                    <Grid item 
                        style={{ height: headerHeight }} 
                        className="discussion-header__container"
                    >

                        <DiscussionHeader 
                            profile={profile}
                            friend={friend}
                            isTempDisc = {isTempDisc}
                            friendlist={friendlist}
                            fetchMatchingFriends={fetchMatchingFriends}
                            suggestions={suggestions}
                            setNewRecipient={setNewRecipient}

                        />
                    </Grid>

                    <Grid 
                        item 
                        ref={screen => {
                            this.screen = screen;
                        }}
                        style={{ height: screenHeight }}
                        className="discussion-screen__container">

                            <DiscussionScreen 
                                discId={openDiscId}
                                messages={messages}
                                user={user}
                            />
                    </Grid>
                    
                    <Grid 
                        className="discussion-action__container"
                        ref={tarea => {
                            this.tarea = tarea;
                        }}
                        style={{ height: inputContainerHeight }}
                        
                    >

                        <DiscussionActions
                            onSendMessage={onSendMessage}
                            onFocusSendInput={markMessagesAsRead}
                            discId = {openDiscId}
                            onElementSizeChanged={this.updateHeights}
                            isWritingMessage={isWritingMessage}
                            updateWritingMessage={updateWritingMessage}
                        >
                        
                            

                        </DiscussionActions>
                        
                    </Grid>
                </Grid>
                
                
            </div>
        );
    }
}




export default withStyles(styles)(DiscussionLayout);