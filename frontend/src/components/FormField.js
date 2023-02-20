import {FormTextbox} from '../StyledElements'

export default function FormField(props) {
    return  (
        <div >
            <p>
                <label>{props.fieldName}</label>
            </p>
            <FormTextbox type="text" value={props.fieldValue} onChange={props.onChangeCB}/>
        </div>
    );
}