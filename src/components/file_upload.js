import FileField from 'redux-form-dropzone'
import {Field} from 'redux-form'

const MyComponent = (props) => {
return (
		<Field name="resume" component={ FileField }  {...props.resume}/>
	)
}

export default MyComponent;
