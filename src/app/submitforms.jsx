import React, { useState } from "react";

export { SubmitForms };

function SubmitForms(props) {
  return (
    <form>
      <div className="form-inner">
        <div className={"field-wrap " + props.errorValues.fieldName}>
          <span className="errorMsg">
            Should not bee empty or input value contains number
          </span>
          <input
            type="text"
            name="fieldName"
            placeholder="Name"
            value={props.values.fieldName}
            onChange={props.onChangeValue}
            onBlur={props.validateEmptyField}
          />
        </div>
        <div className={"field-wrap " + props.errorValues.fieldSurname}>
          <span className="errorMsg">
            Should not bee empty or input value contains number
          </span>
          <input
            type="text"
            name="fieldSurname"
            placeholder="Surname"
            value={props.values.fieldSurname}
            onChange={props.onChangeValue}
            onBlur={props.validateEmptyField}
          />
        </div>
        <div className={"field-wrap " + props.errorValues.fieldAge}>
          <span className="errorMsg">
            Age should be more that 18, or input value is not a number
          </span>
          <input
            type="text"
            name="fieldAge"
            placeholder="Age"
            value={props.values.fieldAge}
            onChange={props.onChangeValue}
            onBlur={props.validateAgeField}
          />
        </div>
        <div className={"field-wrap " + props.errorValues.fieldCity}>
          <span className="errorMsg">
            Should not bee empty or input value contains number
          </span>
          <input
            type="text"
            name="fieldCity"
            placeholder="City"
            value={props.values.fieldCity}
            onChange={props.onChangeValue}
            onBlur={props.validateEmptyField}
          />
        </div>
        <button type="submit" onClick={props.submitForm}>
          Add
        </button>
      </div>
    </form>
  );
}

// export default SubmitForms;
