import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    input:{
        display: "none"
    }
}

const UploadButton = ({
    handleChange, 
    accept="image/*", 
    inputProps, 
    buttonType="contained", 
    buttonCss, 
    buttonTitle, 
    classes
}) => (
    <Fragment>
            <input
                accept={accept}
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={handleChange}
                {...inputProps}
            />
            <label htmlFor="contained-button-file">
                <Button variant={buttonType} component="span" className={buttonCss}>
                    {buttonTitle}
                </Button>
            </label>
    </Fragment>
)


export default withStyles(styles)(UploadButton);