import axios from 'axios';
import history from '../history';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE,
    ADD_PICTURE,
    FETCH_PHOTO
} from './types';

const ROOT_URL = "http://localhost:3090";

export function signinUser({ email, password }) {
  return function(dispatch) {

    // Submit email/password to the server
      axios.post(`${ROOT_URL}/signin`, { email, password })
          .then(response => {
              // If request is good..
              // - Update the state to indicate user is authenticated
              dispatch({ type: AUTH_USER })
              // - Save the JWT token
              console.log(response.data.token);
              localStorage.setItem('token', response.data.token);
              // - redirect to the route /feature
              history.push('/feature');
          })
          .catch(() => {
              // If request is bad..
              // - Show error to the user
                dispatch(authError('Bad Login Info'));
          });
  }
}

export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                // If request is good..
                // - Update the state to indicate user is authenticated
                dispatch({ type: AUTH_USER })
                // - Save the JWT token
                localStorage.setItem('token', response.data.token);
                // - redirect to the route /feature
                history.push('/home');
            })
            .catch(error => {
                const response = error.response;
                dispatch(authError(response.data.error));
            });
    }
}

export function signoutUser() {
    localStorage.removeItem('token');

    return { type: UNAUTH_USER };
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function fetchMessage() {
    return function(dispatch) {
      axios.get(ROOT_URL, {
          headers: { authorization: localStorage.getItem('token') }
      })
          .then((response) => {
                dispatch({
                    type: FETCH_MESSAGE,
                    payload: response.data.message
                })
          });
    };
}

export function fetchPhoto() {
  return function(dispatch) {
    axios.get(`${ROOT_URL}/photo/fetchAll`, {
        headers: { authorization: localStorage.getItem('token') }
    })
        .then((response) => {
              dispatch({
                  type: FETCH_PHOTO,
                  payload: response.data.photos
              })
        });
  };
}

export function uploadPhoto(data) {
  return function(dispatch) {

    Date.prototype.toBasicISOString = function() {
      return this.toISOString().replace(/[:\-]|\.\d{3}/g, '');
    }

    function getDateStr(d) {
      function pad(num) {
        return num.toString().length === 1 ? '0' + num : num
      }
      return d.getFullYear().toString() + pad(d.getMonth() + 1) + pad(d.getDate())
    }

    let file = data.files[0];
    const AWS_ACCESS_KEY_ID = 'AKIAJQOR3RTYHRS7OKDA';

    const d = new Date();
    const bucket = 'instaclone-pictures';
    const key = Date.now().toString() + '/' + file.name;
    const algorithm = 'AWS4-HMAC-SHA256';
    const credential = [
        AWS_ACCESS_KEY_ID,
        getDateStr(d),
        'us-east-1',
        's3',
        'aws4_request'
      ].join('/');
    const dStr = d.toBasicISOString();

    const body = {
      acl: 'public-read',
      bucket: bucket,
      key: key,
      'x-amz-algorithm': algorithm,
      'x-amz-credential': credential,
      'x-amz-date': dStr
    };
    const config = {
      'content-type': 'application/json;charset=UTF-8',
      headers: { authorization: localStorage.getItem('token')}
    };
    const s3Url = 'https://' + bucket + '.s3.amazonaws.com/';
    axios.post('http://localhost:3090/photo/upload', body, config)
      .then(resp => {
        let body = new FormData();
        body.append('key', key); // order matters?
        body.append('file', file);
        body.append('policy', resp.data.policy);
        body.append('x-amz-algorithm', algorithm);
        body.append('x-amz-credential', credential);
        body.append('x-amz-date', dStr);
        body.append('x-amz-signature', resp.data.signature);

        return axios.post(s3Url, body);
      })
      .then((response) => {
        console.log(s3Url+key);
        dispatch({
          type: FETCH_PHOTO
        });
        history.push('/home');
      })

  }
}
