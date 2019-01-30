import React, {Fragment, Component} from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class FullTabs extends Component {
  state = {
    selected: 0,
    tabs: []
  };

  componentDidMount() {
    const { children } = this.props;
    const tabs = [];
    let selected = 0;

    children.map((x, key) => {
      selected = x.props.selected || 0;
      tabs[key] = x.props.label;
      return true;
    });

    this.setState({ tabs, selected });
  }

  handleChange = (event, selected) => {
    this.setState({ selected });
  };

  render() {
    const { children, classes } = this.props;
    const { selected, tabs } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs value={selected} onChange={this.handleChange}>
            {tabs.map((t, key) => (
              <Tab label={t} value={key} key={key} />
            ))}
          </Tabs>
        </AppBar>
        {children.map(
          (Panel, key) => key === selected && <Fragment key={key}>{Panel.props.children}</Fragment>
        )}
      </div>
    );
  }
}

FullTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullTabs);
