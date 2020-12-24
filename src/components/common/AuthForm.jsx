import React, { useState, useRef } from "react";
import { FormValues } from "../../classes/FormValuesClass";
import { login, signup } from "../../api/";
import { Button } from "../common";
import { connect } from "react-redux";
import { makeTeam, fetchTeamId } from "../../store/actions/actions";
import { useHistory } from "react-router-dom";


const Form = props => {

    const { login, signup, makeTeam, fetchTeamId, userId, formType } = props;
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    /*
        1. Make Form Values (make a separate file for class, so I can import into Login Component)
        2. Essentially, login should be just like Signup, except token should be stored in localStorage
        3. Post login form values to the login endpoint
        4. Add yup form Validation or React Form Validation that Max talked about
    */
    
    const submitHandler = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const user = new FormValues(email.trim(), password.trim(), false);
        if (formType === "Login") {
            login(user);
            history.push("/main_menu");
        };
        if (formType === "Signup") {
            signup(user);
            makeTeam();
            history.push("/main_menu");
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>
                Email:
                    <input 
                    placeholder="Enter Email"
                    type="text"
                    ref={emailRef}
                    />
                </label>
                <label>
                Password:
                    <input 
                    placeholder="Enter Password"
                    type="password"
                    ref={passwordRef}
                    />
                </label>
                <Button 
                isDisabled={false}
                classType="submit-button"
                buttonText={"Submit"}
                />
            </form>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        userId: state.userId
    }
}

export default connect(mapStateToProps, { login, signup, makeTeam, fetchTeamId })(Form);


/*
1) Review how Login and SignUp work
2) Set up actions for both logging in and signing up
3) Make form component in only jsx for now
4) See what needs to be in the form component and what needs to
    be in the page components
    - inputChange and ChangeHandler should be in the form component
5) 








*/