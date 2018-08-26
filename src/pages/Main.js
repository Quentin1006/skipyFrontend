import React, { Component } from 'react';
import './Main.css';


import DiscussionList from "../components/DiscussionList";
import DiscussionLayout from "../components/DiscussionLayout";
import WelcomeLayout from "../components/WelcomeLayout";



const discussions= [
    {
        friendsProfilepic: "entete-carre-magenta.png",
        friendsName:"Liam Neeson",
        lastMessage:"Long time no see pal! But i need to add some text to really see how it fits, eventhough its getting quite, i think we haven't met the limit. Now it should be good"
    },
    {
        friendsProfilepic: "entete-carre-magenta.png",
        friendsName:"Coco Nuts",
        lastMessage:"Just a short text"
    }
]



class Main extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const isDiscussionOpened = true;
        return (
            <div className="main__wrapper">
                <div className="discussions-list__wrapper">
                    <DiscussionList discussions={discussions}/>  
                </div>
                <div className="discussion-content__wrapper">
                    {isDiscussionOpened 
                        ? <DiscussionLayout messages={[]} friendProfile={""} userProfile={""}/> 
                        : <WelcomeLayout userProfile={""}/>}
                </div>
               
            </div>
        );
    }
}


export default Main;