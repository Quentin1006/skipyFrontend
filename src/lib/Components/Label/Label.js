import React from 'react';


const firstAsCap = (t) => t[0].toUpperCase() + t.substr(1)

const Label = ({text, htmlFor='', classes}) => (
    <label htmlFor={htmlFor} className={classes}>
        {firstAsCap(text)}&nbsp;
    </label>
)


export default Label;