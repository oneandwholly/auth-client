import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import * as actions from '../actions';
import { connect } from 'react-redux';
import history from '../history';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
  const files = field.input.value;
  return (
    <div>
      <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
      >
        <div>Try dropping some files here, or click to select files to upload.</div>
      </Dropzone>
      {field.meta.touched &&
        field.meta.error &&
        <span className="error">{field.meta.error}</span>}
      {files && Array.isArray(files) && (
        <ul>
          { files.map((file, i) => <li key={i}>{file.name}</li>) }
        </ul>
      )}
    </div>
  );
}

class AddNewPost extends Component {

  onSubmit(data) {

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
    const config = { 'content-type': 'application/json;charset=UTF-8' };
    const s3Url = 'https://' + bucket + '.s3.amazonaws.com/';
    axios.post('http://localhost:3090/sign', body, config)
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
        console.log('url:', s3Url+key);
        console.log(this.props.addPicture);
        this.props.addPicture({ picture: s3Url+key });
        history.push('/home');
      })
    // var body = new FormData();
    // Object.keys(data).forEach(( key ) => {
    //   console.log(data[key][0])
    //   body.append(key, data[ key ][0]);
    // });
    //
    // console.info('POST', body, data);
    // console.info('This is expected to fail:');
    // // fetch(`http://localhost:3090/upload`, {
    // //   method: 'POST',
    // //   body: body,
    // // })
    //
    // const config = {
    //     headers: { 'content-type': 'multipart/form-data' }
    // };
    //
    // axios.post('http://localhost:3090/upload', body, config)
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.error(err));
  }

  render() {
    const {
      handleSubmit,
      reset,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div>
          <label htmlFor={FILE_FIELD_NAME}>Files</label>
          <Field
            name={FILE_FIELD_NAME}
            component={renderDropzoneInput}
          />
        </div>
        <div>
          <button type="submit">
            Submit
          </button>
          <button onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'simple',
})(AddNewPost);

export default connect(null, actions)(form);
