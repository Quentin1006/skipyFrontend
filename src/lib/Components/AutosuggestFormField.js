import React, { Component } from "react";
import PropTypes from "prop-types";
import Autosuggest from "react-autosuggest";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

function defaultInputComponent(inputProps) {
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
          input: classes.suggestInput
        }
      }}
      {...other}
    />
  );
}
const styles = theme => ({
  container: {
    width:"100%",
    position: "relative",
    // display: "flex",
    // alignItems:"center",
    // width:"100%"
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
  }
});

class AutosuggestFormField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      single: "",
      suggestions: []
    };
  }

  renderSuggestionsContainer = options => (
    <Paper {...options.containerProps} square>
      {options.children}
    </Paper>
  )

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


  handleSuggestionsFetchRequested = ({ value }) => {
    const { getSuggestions } = this.props;
    getSuggestions(value);
  };

  handleSuggestionsClearRequested = () => {
    return;
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue
    });
    this.props.onHandleChange(newValue);
  };

  handleOnSuggestionSelected = (event, selectionInfos) => {
    const { onSuggestionSelected } = this.props;
    const { suggestion } = selectionInfos;

    onSuggestionSelected(suggestion)
  }

  render() {
    const { 
      classes, 
      getSuggestionValue,
      inputComponent,
      inputProps, 
    } = this.props;

    const renderInputComponent = inputComponent || defaultInputComponent

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.props.listOfSuggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      renderSuggestionsContainer: this.renderSuggestionsContainer,
      getSuggestionValue,
      renderSuggestion: this.renderSuggestion,
      onSuggestionSelected: this.handleOnSuggestionSelected,
    };

    return (
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            value: this.state.single,
            onChange: this.handleChange("single"),
            ...inputProps
          }}
          theme={{
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
          }}
        />
    );
  }
}

AutosuggestFormField.propTypes = {
  getSuggestionValue: PropTypes.func.isRequired,
  getSuggestions: PropTypes.func.isRequired,
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
