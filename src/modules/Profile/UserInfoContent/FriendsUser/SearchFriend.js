import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { TextField } from "@material-ui/core";



const styles = theme => ({
    container : {
        padding: 40
    }
})



class SearchFriend extends Component {
    
    onHandleChange = (e) => {
        const { onHandleChange } = this.props;
        const { value } = e.target;
        onHandleChange(value);
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <TextField
                    id="search-friend"
                    className={classes.textField}
                    placeholder="Enter a friend's name..."
                    margin="normal"
                    onChange={this.onHandleChange}
                />
            </div>
        );
    }
}

export default withStyles(styles)(SearchFriend);

