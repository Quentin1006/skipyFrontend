import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    error: {
        color: "red",
        marginBottom: 20
    }
})

const FormikField = ({label, name, readOnly=false, className, classes}) => (
    <React.Fragment>
        <Field name={name}>
            {({ field }) => (
            <TextField
                name={field.name}
                label={label}
                className={className}
                margin="normal"
                InputProps={{
                    readOnly: readOnly
                }}
                {...field}
            />
            )}
        </Field>
        <ErrorMessage name={name}>
            {msg => (
                <div className={classes.error}>
                    {msg}
                </div>
            )}
        </ErrorMessage>
    </React.Fragment>

)


export default withStyles(styles)(FormikField);