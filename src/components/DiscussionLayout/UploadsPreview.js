import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import PreviewImage from "../../lib/Components/PreviewImage";


const styles = {
    container: {

    },
    previewImg: {
        margin: "4px 10px",
        backgroundColor: "#000",
        borderRadius: "4px",
    },
    wrapper: {
        padding: "4px 10px 4px",
        display: "flex",
        flexDirection: "row-reverse",
    }
}

class UploadsPreview extends Component {

    renderPreview = () => {
        const { uploads, deleteUpload, classes } = this.props;

        return (
            uploads.map(({id, preview}) => (
                <PreviewImage 
                    key={id} 
                    id={id}
                    src={preview} 
                    className={classes.previewImg}
                    closePreview={deleteUpload}
                />
            ))
        )
    }


    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container} ref={preview => {this.previewWrapper = preview}}>
            {  
                <div className={classes.wrapper} > 
                    {this.renderPreview()}
                </div>
            }
            </div>
        );
    }
}

UploadsPreview.propTypes = {
    uploads: PropTypes.array.isRequired,
    deleteUpload: PropTypes.func.isRequired,
};

export default withStyles(styles)(UploadsPreview);