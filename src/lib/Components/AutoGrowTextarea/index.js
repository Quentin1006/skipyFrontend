import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core";

const fontSize = 14;

const styles = theme => {
  return {
    testFontWidth: {
      position: "absolute",
      left: "-10000",
      display: "none",
      height: "auto",
      width: "auto",
      whiteSpace: "nowrap",
      padding: "0",
      margin: "0",
      fontFamily: "Courier"
    },
    sendInput: {
      boxSizing: "border-box",
      width: "calc(100%)",
      resize: "none",
      overflow: "hidden",
      fontSize: fontSize + "px",
      fontFamily: "Courier",
      padding: "4px 8px",
      overflowWrap: "break-space" 
    }
  };
};

const getNumberOfCharPerLine = (fontSize, parentWidth) => {
  const widthChar = parseFloat(fontSize);
  const widthContainer = parseFloat(parentWidth);

  return Math.floor(widthContainer / widthChar);
};

const getPad = (computedStyle) => {
  return parseFloat(computedStyle.paddingLeft) 
          + parseFloat(computedStyle.paddingRight)
          + parseFloat(computedStyle.borderLeft)
          + parseFloat(computedStyle.borderRight)
}

class AutoGrowTextarea extends Component {
  state = {
    rows: 1,
    rowHeight: 0,
    charPerLine: 0,
    widthOfChar: 0,
    value: "",
    tareaWidth: 0,
    // represents the padding + border of textarea
    // since we are using border-box
    pad:0
  };

  onWidthChange = () => {
    const { widthOfChar, pad } = this.state;
    const tareaWidth = parseFloat(getComputedStyle(this.tarea).width) - pad;


    const charPerLine = getNumberOfCharPerLine(widthOfChar, tareaWidth);
    console.log(
      "widthOfChar:",
      widthOfChar,
      ", charPerLine:",
      charPerLine,
      ", tareaWidth:",
      tareaWidth
    );
  

    this.setState(state => ({
      ...state,
      charPerLine,
      tareaWidth
    }));
  };

  componentDidMount() {
    const widthOfChar = this.getWidthOfChar();
    const computedStyle = getComputedStyle(this.tarea);
    const rowHeight = parseInt(computedStyle.height, 10);
    const pad = getPad(computedStyle);
  
    const tareaWidth = parseFloat(computedStyle.width) - pad;

    const charPerLine = getNumberOfCharPerLine(widthOfChar, tareaWidth);
    console.log(
      "widthOfChar:",
      widthOfChar,
      ", charPerLine:",
      charPerLine,
      ", tareaWidth:",
      tareaWidth
    );
    window.addEventListener("resize", this.onWidthChange);

    this.setState(state => ({
      ...state,
      widthOfChar,
      charPerLine,
      tareaWidth,
      rowHeight,
      pad
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state !== prevState) {
      //console.log("updating");
      this.checkIfShouldUpdateHeight();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWidthChange);
  }

  // componentDidUpdate() {
  //   console.log(this.props.size);
  // }

  getWidthOfChar = () => {
    const ctx = this.testChar.getContext("2d");
    ctx.font = "14px courier";

    const txt = "i";
    return ctx.measureText(txt).width;
  };


  checkIfShouldUpdateHeight = () => {
    const { onInputSizeChanged } = this.props;
    const { rows, rowHeight } = this.state;
    const rowsNeeded = Math.max(
      Math.ceil(this.tarea.textLength / this.state.charPerLine),
      1
    );
    console.log(this.state.charPerLine, this.tarea.textLength);
    console.log("rows:", rows, " rowsNeeded:", rowsNeeded);

    if (rows !== rowsNeeded) {
      const heightChange = (rowsNeeded - rows) * rowHeight;
      //console.log("rows:", rows, " rowsNeeded:", rowsNeeded);
      //console.log("rowHeight:", rowHeight);
      onInputSizeChanged(heightChange);

      this.setState(state => ({ ...state, rows: rowsNeeded }));
    }
  };


  onHandleChange = e => {
    const { onInputValueChange } = this.props;
    const value = e.currentTarget.value;

    onInputValueChange(value);
  };


  onHandleKeyUp = () => {
    this.checkIfShouldUpdateHeight();
  };


  render() {
    console.log("!!!!!!! PROBLEM WITH SPACE AT THE END OF A LINE !!!!!!")
    const { classes, inputProps } = this.props;
    const { rows } = this.state;
    //console.log("in render:", rows);
    return (
      <Fragment>
        <canvas
          className={classes.testFontWidth}
          ref={test => (this.testChar = test)}
        >
          a
        </canvas>
        <textarea
          type="text"
          rows={rows}
          className={classes.sendInput}
          onChange={this.onHandleChange}
          wrap="soft"
          onKeyUp={this.onHandleKeyUp}
          maxLength={1000}
          ref={tarea => {
            this.tarea = tarea;
          }}
          {...inputProps}
        />
      </Fragment>
    );
  }
}

AutoGrowTextarea.propTypes = {
  handleInputValue: PropTypes.func,
  onInputSizeChanged: PropTypes.func
};

AutoGrowTextarea.defaultProps = {
  handleInputValue: () => {},
  onInputSizeChanged: () => {}
};

export default withStyles(styles)(AutoGrowTextarea);
