import React from "react";
import PropTypes from "prop-types";

const TinyLabel = ({label, isUppercase, styles}) => (
    <small 
        style={{
            fontSize: "10px", 
            textTransform:`${isUppercase ? "uppercase":"lowercase"}`,
            color: "grey",
            ...styles
        }}
    >
        {label}
    </small>
);

TinyLabel.propTypes = {
    label: PropTypes.string.isRequired,
    isUppercase: PropTypes.bool,
    styles: PropTypes.object
}

TinyLabel.defaultProps = {
    isUppercase: true
}



export default TinyLabel
