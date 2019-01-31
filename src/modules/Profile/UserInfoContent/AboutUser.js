import React, { Component } from 'react';
import { Formik, Form } from 'formik';
import PropTypes from "prop-types";
import * as Yup from "yup";

import { Fab, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';

import FormikField from "./AboutUser/FormikField";
import FormikSelect from "./AboutUser/FormikSelect";



const styles = theme => ({
    container: {
        padding: 40
    },
    formContainer: {
        margin: "40px 20px"
    },
    editForm: {
        display: "flex",
        flexFlow: "row-reverse nowrap",
        borderBottom: "1px solid #eee",
        padding:5
    },
    submitContainer: {
        display: "flex",
        flexFlow: "row-reverse nowrap",
        borderTop: "1px solid #eee",
        margin: "30px 0",   
        padding:10

    },
    textField: {
        width:"50%",
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginLeft: theme.spacing.unit,
    },
});


const signupSchema =  Yup.object().shape({
    firstname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lastname: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email("Invalid Email").required("Email is required")
})



class AboutUser extends Component {
    state={
        isEditing: false,
    }

    componentWillUnmount() {
        console.log("unmounting AboutUser")
    }

    setEditingMode = () => {
        this.setState({isEditing: true})
    }

    leaveEditingMode = () => {
        this.setState({isEditing: false})
    }

    onHandleSubmit = (values, actions) => {
        const { updateUser } = this.props;
        updateUser(values)
        actions.setSubmitting(false);
        this.leaveEditingMode();
        
    }

    render() {
        const { userprofile, classes } = this.props
        const { isEditing } = this.state;
        return (
            <div className={classes.container}>
                <div className={classes.editForm}>
                {
                    !isEditing && 
                    <Button onClick={this.setEditingMode} variant="outlined" color="primary">
                        <EditIcon />Edit
                    </Button>
                }
                    
                   
                </div>
                <div className={classes.formContainer}>
                    <Formik
                        initialValues={userprofile}
                        onSubmit={this.onHandleSubmit}
                        validationSchema={signupSchema}
                    >
                        {({errors, status, touched, resetForm, isSubmitting}) => (

                            <Form>
                                <fieldset disabled={!isEditing} style={{border: "none"}}>
                                    <FormikField label={"Firstname"} name={"firstname"} className={classes.textField}/>
                                    <FormikField label={"Lastname"} name={"lastname"} className={classes.textField}/>
                                    <FormikField label={"Email"} name={"email"} className={classes.textField}/>
                                    <FormikSelect
                                        label={"Country"} 
                                        name={"country"}
                                        options={[{label:"Germany",value:"GER"}, {label:"France", value:"FRA"}]}
                                        className={classes.textField}
                                        helperText={isEditing ? "Choose where you are from": ""}
                                    />

                                    {status && status.msg && <div>{status.msg}</div>}
                                
                                    {isEditing &&
                                    <div className={classes.submitContainer}>
                                        <Fab 
                                            type="submit" 
                                            disabled={isSubmitting} 
                                            variant="extended" 
                                            color="primary"
                                            aria-label="Submit" 
                                            className={classes.fab}
                                        >
                                            Submit 
                                            <NavigationIcon className={classes.extendedIcon} />
                                        
                                        </Fab>
                                        <Fab 
                                                type="reset" 
                                                variant="extended"
                                                color="secondary"
                                                aria-label="cancel" 
                                                className={classes.fab}
                                                onClick={() => {resetForm(); this.leaveEditingMode()}}
                                            >
                                            Cancel 
                                            <CancelIcon className={classes.extendedIcon} />
                                            
                                        </Fab>
                                    </div>}
                                    
                                    
                                </fieldset>

                            </Form>
                        )}
                    </Formik>
                </div>
                
            </div>
        );
    }
}

AboutUser.proptypes = {
    userprofile: PropTypes.object.isRequired,
    updateUser: PropTypes.func.isRequired
}

export default withStyles(styles)(AboutUser);