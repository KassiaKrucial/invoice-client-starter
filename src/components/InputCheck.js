/**
 * This component can make a checkbox or radio type input for forms depending on props sent
 * @param props props.type...input type, </br>props.name...input name, </br>props.value...input value, </br>props.label...input label, </br>props.handleChange...what should happen on user's action
 * @returns {JSX.Element|null} Renders the chosen type of input
 * @constructor Makes an instance of chosen input
 */
export function InputCheck(props) {
  // podporované typy pro element input
  const INPUTS = ["checkbox", "radio"];

  // validace typu
  const type = props.type.toLowerCase();
  const checked = props.checked || "";

  if (!INPUTS.includes(type)) {
    return null;
  }

  return (
    <div className="form-group form-check">
      <label className="form-check-label">
        {/* vykreslení s aktuálním typem */}
        <input
          type={props.type}
          className="form-check-input"
          name={props.name}
          value={props.value}
          checked={checked}
          onChange={props.handleChange}
        />{" "}
        {props.label}
      </label>
    </div>
  );
}

export default InputCheck;
