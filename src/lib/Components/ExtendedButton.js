import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class ExtendedButton extends Component {
  render() {
    const { classes, onClick, onMouseOver } = this.props;
    return (
      <Button
        variant="extendedFab"
        aria-label="Delete"
        className={classes.button}
        onClick={onClick}
        onMouseOver={onMouseOver} 
      >
       
        {this.props.children}
      </Button>
    );
  }
}

ExtendedButton.propTypes = {
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func
}

export default withStyles(styles)(ExtendedButton);
