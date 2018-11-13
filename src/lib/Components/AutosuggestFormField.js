import React, { Component } from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import { withStyles } from "@material-ui/core/styles";

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input
        }
      }}
      {...other}
    />
  );
}
const styles = theme => ({
  root: {
    height: 250,
    flexGrow: 1
  },
  container: {
    position: "relative"
  },
  suggestionsContainerOpen: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  suggestion: {
    display: "block"
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: "none"
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

class AutosuggestFormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: "",
      popper: "",
      suggestions: []
    };
  }

  renderSuggestionContainer = options => (
    <Popper anchorEl={this.popperNode} open={Boolean(options.children)}>
      <Paper
        square
        {...options.containerProps}
        style={{
          width: this.popperNode ? this.popperNode.clientWidth : null
        }}
      >
        {options.children}
      </Paper>
    </Popper>
  );

  renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const { getSuggestionValue } = this.props;
    const value = getSuggestionValue(suggestion);
    const matches = match(value, query);
    const parts = parse(value, matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </span>
            ) : (
              <strong key={String(index)} style={{ fontWeight: 300 }}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  };

  getSuggestions = value => {
    const {
      listOfSuggestions,
      getSuggestionValue,
      nbOfSuggestions
    } = this.props;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : listOfSuggestions.filter(suggestion => {
          const value = getSuggestionValue(suggestion);
          const keep =
            count < nbOfSuggestions &&
            value.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
    this.props.onHandleChange(newValue);
  };

  render() {
    const { classes, getSuggestionValue, inputProps } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      renderSuggestionContainer: this.renderSuggestionContainer,
      getSuggestionValue,
      renderSuggestion: this.renderSuggestion
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            value: this.state.popper,
            onChange: this.handleChange("popper"),
            inputRef: node => {
              this.popperNode = node;
            },
            InputLabelProps: {
              shrink: true
            },
            ...inputProps
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion
          }}
        />
      </div>
    );
  }
}

AutosuggestFormField.propTypes = {
  getSuggestionValue: PropTypes.func.isRequired,
  listOfSuggestions: PropTypes.array.isRequired,
  inputProps: PropTypes.shape({
    label: PropTypes.string,
    placeholder: PropTypes.string
  }),
  onHandleChange: PropTypes.func
};

AutosuggestFormField.defaultType = {
  nbOfSuggestions: 3
};

export default withStyles(styles)(AutosuggestFormField);
