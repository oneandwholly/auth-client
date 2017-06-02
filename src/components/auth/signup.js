/**
 * Created by one on 17. 6. 2.
 */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <fieldset className="form-group">
                    <div>
                        <label>Email:</label>
                        <Field className="form-control" name="email" component="input" type="text"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <Field className="form-control" name="password" component="input" type="password"/>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <Field className="form-control" name="passwordconfirm" component="input" type="password"/>
                    </div>
                </fieldset>
                <button className="btn btn-primary" type="submit">Sign up!</button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'signup'
})(Signup);