import React, { useState, useRef } from "react";
import { FormValues } from "../../classes/FormValuesClass";
import { login, signup } from "../../api/auth_api";
import { Button } from "../common";
import { connect } from "react-redux";
import { team } from "../../store/actions/";
import { useHistory } from "react-router-dom";


const Form = props => {

    const { makeTeam, fetchTeamId, userId, formType } = props;
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();

    /*
        1. Make Form Values (make a separate file for class, so I can import into Login Component)
        2. Essentially, login should be just like Signup, except token should be stored in localStorage
        3. Post login form values to the login endpoint
        4. Add yup form Validation or React Form Validation that Max talked about
    */
    
    const submitHandler = event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const user = new FormValues(email.trim(), password.trim());
        if (formType === "Login") {
            login(user);
            history.push("/main_menu");
        }
        if (formType === "Signup") {
            signup(user);
            history.push("/main_menu");
        }

    }

    const toLoginHandler = event => history.push("/login");

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
                {formType === "Login" 
                    ? <h3>Forgot your email or password?</h3> 
                    : <h3 onClick={toLoginHandler}>Login instead?</h3>
                }
                <Button 
                isDisabled={false}
                classType="submit-button"
                buttonText={"Submit"}
                />
            </form>
        </div>
    )
}

export default connect(
    state => ({
        userId: state.userId
    }), { 
        makeTeam: team.makeTeam,
        fetchTeamId: team.fetchTeamId 
    })(Form);


/*
1) Review how Login and SignUp work
2) Set up actions for both logging in and signing up
3) Make form component in only jsx for now
4) See what needs to be in the form component and what needs to
    be in the page components
    - inputChange and ChangeHandler should be in the form component
5) 








*/