import React from "react";

/**
 * This component can make a text, textarea, number or date type input for forms depending on props sent
 * @param props props.type...input type, </br> props.rows...height of textarea </br>props.name...input name, </br>props.prompt...prompt for user, </br>props.value...input value, </br>props.label...input label, </br>props.handleChange...what should happen on user's action
 * @returns {JSX.Element|null} Renders the chosen input type
 * @constructor Makes an instance of the chosen input
 */
export function InputField(props) {
  // podporované typy pro element input
  const INPUTS = ["text", "number", "date"];

  // validace elementu a typu
  const type = props.type.toLowerCase();
  const isTextarea = type === "textarea";
  const required = props.required || false;

  if (!isTextarea && !INPUTS.includes(type)) {
    return null;
  }

  // přiřazení hodnoty minima do atributu příslušného typu
  const minProp = props.min || null;
  const min = ["number", "date"].includes(type) ? minProp : null;
  const minlength = ["text", "textarea"].includes(type) ? minProp : null;

  return (
    <div className="form-group">
      <label>{props.label}:</label>

      {/* vykreslení aktuálního elementu */}
      {isTextarea ? (
        <textarea
          required={required}
          className="form-control"
          placeholder={props.prompt}
          rows={props.rows}
          minLength={minlength}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      ) : (
        <input
          required={required}
          type={type}
          className="form-control"
          placeholder={props.prompt}
          minLength={minlength}
          min={min}
          name={props.name}
          value={props.value}
          onChange={props.handleChange}
        />
      )}
    </div>
  );
}

export default InputField;
