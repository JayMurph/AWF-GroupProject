import { FormTextbox } from "../StyledElements";

export default function FormField(props) {
  return (
    <>
      <p>
        <label>{props.fieldName}</label>
      </p>
      <FormTextbox
        type={props.type}
        name={props.name}
        value={props.fieldValue}
        onChange={props.onChangeCB}
        onBlur={props.onBlurCB}
      />
    </>
  );
}
