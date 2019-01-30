import React from 'react';
import PropTypes from "prop-types"

import { Field, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
    menu: {
        width:"100%"
    }
})



const FormikSelect = ({
    name,
    label,
    options=[],
    helperText="",  
    readOnly=false, 
    className, 
    classes
}) => (
    <React.Fragment>
        <Field name={name}>
            {({ field }) => (
            <TextField
                name={field.name}
                label={label}
                className={className}
                select
                InputProps={{
                    readOnly: readOnly
                }}
                value= {field.value}
                SelectProps={{
                    native: true,
                    MenuProps: {
                        PaperProps: {
                            style: {
                                maxHeight: 120,
                            },
                        },
                    className: classes.menu
                    }
                }}
                helperText={helperText}
                margin="normal"
                {...field}
            >
                {field.value === "" && <option value=''></option>}
                {options.map(opt => (
                <option key={opt.value} value={opt.value}>
                {opt.label}
                </option>
            ))}
            </TextField>
            )}
        </Field>
        <ErrorMessage name={name} component="div"/>
    </React.Fragment>

)

FormikSelect.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ])
        })
    )
} 


export default withStyles(styles)(FormikSelect);