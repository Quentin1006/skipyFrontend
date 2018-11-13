import React, { Component } from 'react';


import Button from "@material-ui/core/Button";
import ExtendedButton from "./ExtendedButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class FormDialog extends Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    const { 
        triggerBtnText, 
        title, 
        text, 
        children, 
        onValidateForm, 
        validateText, 
        cancelText
    } = this.props; 
    
    return (
      <div>
        <ExtendedButton onClick={this.handleClickOpen}>{triggerBtnText}</ExtendedButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{text}</DialogContentText>
            <br/>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {cancelText}
            </Button>
            <Button onClick={onValidateForm} color="primary">
                {validateText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


FormDialog.defaultProps = {
    cancelText:"Cancel"
}

export default FormDialog;