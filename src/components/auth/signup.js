/**
 * Created by one on 17. 6. 2.
 */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

    renderField({input, label, type, meta: {touched, error}}) {
        return (
            <div>
                <label>{label}</label>
                <div>
                    <input className="form-control" {...input} type={type} />
                    {touched && error && <div className="error">{error}</div>}
                </div>
            </div>
        );
    }

    render() {
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <Field name="email" type="email" component={this.renderField} label="Email:" />
                    <Field name="password" type="password" component={this.renderField} label="Password:" />
                    <Field name="passwordConfirm" type="password" component={this.renderField} label="Confirm Password:" />
                </fieldset>
                <div>
                    <button type="submit" className="btn btn-primary" disabled={submitting}>Sign up!</button>
                </div>
            </form>
        );

        // return (
        //     <form onSubmit={handleSubmit}>
        //         <fieldset className="form-group">
        //             <div>
        //                 <label>Email:</label>
        //                 <Field className="form-control" name="email" component="input" type="text"/>
        //             </div>
        //             <div>
        //                 <label>Password:</label>
        //                 <Field className="form-control" name="password" component="input" type="password"/>
        //             </div>
        //             <div>
        //                 <label>Confirm Password:</label>
        //                 <Field className="form-control" name="passwordconfirm" component="input" type="password"/>
        //             </div>
        //         </fieldset>
        //         <button className="btn btn-primary" type="submit">Sign up!</button>
        //     </form>
        // );
    }
}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }



    return errors;
}

// function validate(formProps) {
//     const errors = {};
//
//     console.log(formProps)
//     if (formProps.password !== formProps.passwordconfirm) {
//         console.log('im in side!')
//         errors.password = 'Passwords must match';
//     }
//
//     console.log('returning errors obj', errors)
//     return errors;
// }

export default reduxForm({
    form: 'signup',
    validate
})(Signup);