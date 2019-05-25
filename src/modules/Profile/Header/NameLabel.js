import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Label from "../../../lib/Components/Label/Label"


const styles = {
    label: {
        fontSize: 26,
        color: "white",
    }
}


const NameLabel = ({text, classes}) => (
    <Label text={text} classes={classes.label}/>
)
        
        
export default withStyles(styles)(NameLabel);
