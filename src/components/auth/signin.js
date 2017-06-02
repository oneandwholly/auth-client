import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

class Signin extends Component {
  handleFormSubmit({ email, password }) {
    // need to do something to log user in
    this.props.signinUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
          <div className="alert alert-danger">
            <strong>Oops!</strong> {this.props.errorMessage}
          </div>
      )
    }
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
            <Field name="password" component="input" type="password" className="form-control" />
          </fieldset>
            {this.renderAlert()}
          <button className="btn btn-primary" action="submit">Sign in</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}


const Form = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps, actions)(Form);
