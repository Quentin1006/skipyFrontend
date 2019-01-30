import React from 'react';
import PropTypes from 'prop-types';


const TabPanel = ({children, label}) => (
  <div role={label}>{children}</div>
)

TabPanel.propTypes = {
    label: PropTypes.string.isRequired
};

export default TabPanel;