import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    console.log(email,password);
    // need to do something to log user in

  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
          <fieldset className="form-group">
            <label>Email:</label>
            <Field name="email" component="input" type="text" className="form-control" />
            <label>Password:</label>
            <Field name="password" component="input" type="text" className="form-control" />
            <button className="btn btn-primary" action="submit">Sign in</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'signin'
})(Signin);
