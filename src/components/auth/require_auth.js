/**
 * Created by one on 17. 6. 2.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function(ComposedComponent) {
    class Authentication extends Component {

        componentWillMount() {

        }

        render() {

            if (this.props.authenticated) {
                return <ComposedComponent {...this.props} />
            }
            return <Redirect to="/" />
        }
    }

    function mapStateToProps(state) {
        return { authenticated: state.auth.authenticated };
    }

    return connect(mapStateToProps)(Authentication);
}