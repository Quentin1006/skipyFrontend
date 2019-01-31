import React, { Component, Fragment } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Avatar, Button } from '@material-ui/core';

import UploadButton from "../../lib/Components/UploadButton";
import NameLabel from "./Header/NameLabel"

import { _readImageFile } from "../../lib/Reader"


const styles = {
    bigAvatar: {
        width: 150,
        height:150,
        marginLeft:10,
        border: "5px solid #255b51",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
        
    },
    container: {
        position: "relative",
        height: 375,
        width: "100%",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        marginBottom: 40
    },
    landscape: {
        height: 300,
        width: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.7,
    },
    userInfo: {
        display: "flex",
        flexFlow: "row nowrap",
        height: 75,
        backgroundColor: "#255b51"
    },
    ppicture: {
        position: "relative",
        top: -75
    },
    fullname: {
        display: "flex",
        marginLeft: 30,
        alignSelf: "center"
    },
    editLandscape: {
        position: "absolute",
        right: 0,
        top: 0
    },
    input: {
        display: "none"
    },
    button: {
        color: "white"
    }
}

class Header extends Component {
    state = {
        isEditingLandscape: false,
        tempLandscape: null,
        showLandscapeEditBtn: false
    }

    componentDidUpdate(prevProps){
        const { landscape } = this.props;
        if(prevProps.landscape !== landscape){
            this.setState({
                isEditingLandscape: false,
                tempLandscape: null,
            })
        }
    }


    onHandleChange = async (e) => {
        const newLandscape = e.target.files[0]; 
        try{
            const upload = await _readImageFile(newLandscape);
            this.setState({
                isEditingLandscape: true,
                tempLandscape: upload
            });
        }
        catch(e){
            console.log(e);
        }
        
    }

    onDiscard = () => {
        this.setState({
            isEditingLandscape: false,
            tempLandscape: null,
        })
    }

    onConfirm = () => {
        const { updateUser } = this.props;
        const { tempLandscape } = this.state;

        updateUser({landscapePicture: tempLandscape.fileToUpload});
    }

    displayEditLandscapeBtn = () => {
        this.setState({
            showLandscapeEditBtn: true
        })
    }

    hideEditLandscapeBtn = () => {
        this.setState({
            showLandscapeEditBtn: false
        })
    }

    renderConfirmNewLandscapeBtn = ({button}) => (
        <Fragment>
            <Button onClick={this.onDiscard} variant="contained" component="span" className={button}>
                Discard
            </Button>
            &nbsp;
            <Button onClick={this.onConfirm} variant="contained" component="span" className={button}>
                Confirm
            </Button>
        </Fragment>
    )


    render() {
        const { landscape, ppicture, firstname, lastname, classes } = this.props;
        const { isEditingLandscape, tempLandscape, showLandscapeEditBtn } = this.state;
        const landscapeToShow = isEditingLandscape ? tempLandscape.preview : landscape;
        const normLandscapeToShow = landscapeToShow.replace("/\\\\/", "/");
        return (
            <div className={classes.container} >
                {
                    <div 
                        className={classes.landscape} 
                        style={{backgroundImage: "url("+normLandscapeToShow +")" } }
                        onMouseEnter={this.displayEditLandscapeBtn}
                        onMouseLeave={this.hideEditLandscapeBtn}
                    >
                        <div className={classes.editLandscape}>
                            {
                                isEditingLandscape 
                                ? this.renderConfirmNewLandscapeBtn(classes)
                                : showLandscapeEditBtn && 
                                    <UploadButton 
                                        onHandleChange={this.onHandleChange}
                                        buttonTitle="Edit Landscape"    
                                    />
                            }
                        </div>
                    </div>
                }
                

                <div className={classes.userInfo}>
                    <div className={classes.ppicture}>
                        <Avatar alt="user profilepicture" src={ppicture} className={classes.bigAvatar} />
                    </div>

                    <div className={classes.fullname}>
                        <NameLabel text={firstname}/>
                        <NameLabel text={lastname} />
                    </div>
                </div>
                
                

            </div>
        );
    }
}

export default withStyles(styles)(Header);