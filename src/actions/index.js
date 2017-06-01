import axios from 'axios';
import history from '../history';

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  return function(dispatch) {

    // Submit email/password to the server
      axios.post(`${ROOT_URL}/signin`, { email, password })
          .then(response => {
              // If request is good..
              // - Update the state to indicate user is authenticated
              // - Save the JWT token
              // - redirect to the route /feature
            history.push('/feature');
          })
          .catch(() => {
              // If request is bad..
              // - Show error to the user
          });
  }
}
