import Styles from '../styles.module.css';

export default function FormField(props) {
    return  (
        <div >
            <p>
                <label>{props.fieldName}</label>
            </p>
            <input className={Styles.FormFieldTextbox} type="text" value={props.fieldValue} onChange={props.onChangeCB}/>
        </div>
    );
}