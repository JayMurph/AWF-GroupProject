export default function FormField(props) {
    return  (
        <>
            <p>
                <label>{props.fieldName}</label>
            </p>
            <input type="text" value={props.fieldValue} onChange={props.onChangeCB}/>
        </>
    );
}