import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ThumbnailImage from "../../../../lib/Components/ThumbnailImage"
import Label from '../../../../lib/Components/Label/Label';


const styles = theme => ({
    content: {
        display: "flex",
        alignItems: "center",
        padding: 10
    }
})

const FriendInfoThumbnail = ({firstname, lastname, profilepic, classes}) => {
    const fullname = `${firstname} ${lastname}`; 

    return (
        <ThumbnailImage imageSrc={profilepic} imageAlt={fullname} square={true}>
            <div className={classes.content}>
                <h4><Label text={firstname}/><Label text={lastname}/></h4>
            </div>
            <div className={classes.actions}></div>
        </ThumbnailImage>
    )
}




export default withStyles(styles)(FriendInfoThumbnail)