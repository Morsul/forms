import React, { useState } from "react";
import { SubmitForms } from "./submitforms.jsx";

function App() {
  const [formFields, setFormFileds] = useState({
    fieldName: "",
    fieldSurname: "",
    fieldCity: "",
    fieldAge: "",
  });

  const [formErrorFields, setFieldsError] = useState({
    fieldName: "",
    fieldSurname: "",
    fieldCity: "",
    fieldAge: "",
  });

  const [editField, changeEditField] = useState({
    fieldName: "",
    fieldSurname: "",
    fieldCity: "",
    totalyAgree: false,
    editedRow: "",
  });
  const [editFieldError, changeEditFieldError] = useState({
    fieldName: "",
    fieldSurname: "",
    fieldCity: "",
    totalyAgree: "",
  });

  const fieldChange = (event) => {
    setFormFileds({ ...formFields, [event.target.name]: event.target.value });
  };

  const fieldChangeModal = (event) => {
    changeEditField({ ...editField, [event.target.name]: event.target.value });
  };
  const handleChange = (event) => {
    changeEditField({ ...editField, totalyAgree: event.target.checked });
  };

  const isValidField = (value) => {
    if (value === "" || value.match(/\d/)) {
      return false;
    }
    return true;
  };

  const isCheckedField = (value) => {
    if (!value) {
      return false;
    }
    return true;
  };

  const isValidAge = (value) => {
    if (value < 18 || isNaN(value)) {
      return false;
    }
    return true;
  };

  const validateAge = () => {
    setFieldsError({
      ...formErrorFields,
      fieldAge: !isValidAge(formFields.fieldAge) ? "error" : "",
    });
  };

  const validateEmptyField = (event) => {
    setFieldsError({
      ...formErrorFields,
      [event.target.name]: !isValidField(event.target.value) ? "error" : "",
    });
  };

  const validateEditFormField = (event) => {
    changeEditFieldError({
      ...editFieldError,
      [event.target.name]: !isValidField(event.target.value) ? "error" : "",
    });
  };

  const setDefaulEditFields = () => {
    changeEditFieldError({
      fieldName: "",
      fieldSurname: "",
      fieldCity: "",
      totalyAgree: "",
    });
  };

  const deleteRow = (event) => {
    event.target.closest("tr").remove();
  };

  const closeForm = () => {
    setDefaulEditFields();
    document.getElementById("formEdit").classList.remove("show");
  };

  const saveChanges = (event) => {
    event.preventDefault();
    let currentTdList = editField.editedRow;

    let formIsValid =
      !isValidField(editField.fieldName) ||
      !isValidField(editField.fieldSurname) ||
      !isValidField(editField.fieldSurname) ||
      !isCheckedField(editField.totalyAgree)
        ? false
        : true;
    if (formIsValid) {
      currentTdList[0].innerHTML = editField.fieldName;
      currentTdList[1].innerHTML = editField.fieldSurname;
      currentTdList[3].innerHTML = editField.fieldCity;
      closeForm();
      return;
    } else {
      changeEditFieldError({
        fieldName: !isValidField(editField.fieldName) ? "error" : "",
        fieldSurname: !isValidField(editField.fieldSurname) ? "error" : "",
        fieldCity: !isValidField(editField.fieldCity) ? "error" : "",
        totalyAgree: !isCheckedField(editField.totalyAgree) ? "error" : "",
      });
    }
  };

  const editRow = (event) => {
    event.preventDefault();
    document.getElementById("formEdit").classList.add("show");
    const currentTdList = event.target.closest("tr").getElementsByTagName("td");

    changeEditField({
      ...editField,
      fieldName: currentTdList[0].innerHTML,
      fieldSurname: currentTdList[1].innerHTML,
      fieldCity: currentTdList[3].innerHTML,
      editedRow: currentTdList,
    });
  };

  const addRow = (event) => {
    event.preventDefault();

    let formIsValid =
      !isValidField(formFields.fieldName) ||
      !isValidField(formFields.fieldSurname) ||
      !isValidAge(formFields.fieldAge) ||
      !isValidField(formFields.fieldSurname)
        ? false
        : true;

    if (formIsValid) {
      let buttonWrap = document.createElement("div");
      buttonWrap.classList.add("button-wrap");

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-row");
      deleteButton.onclick = deleteRow;

      let editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("edit-row");
      editButton.onclick = editRow;

      buttonWrap.append(editButton, deleteButton);
      let newRow = document.getElementById("table-main").insertRow();
      newRow.insertCell().innerHTML = formFields.fieldName;
      newRow.insertCell().innerHTML = formFields.fieldSurname;
      newRow.insertCell().innerHTML = formFields.fieldAge;
      newRow.insertCell().innerHTML = formFields.fieldCity;
      newRow.insertCell().append(buttonWrap);
    } else {
      setFieldsError({
        fieldName: !isValidField(formFields.fieldName) ? "error" : "",
        fieldSurname: !isValidField(formFields.fieldSurname) ? "error" : "",
        fieldAge: !isValidAge(formFields.fieldAge) ? "error" : "",
        fieldCity: !isValidField(formFields.fieldCity) ? "error" : "",
      });
    }
  };

  const copyTable = (event) => {
    const curentTalve = event.target.closest(".table-wrap");
    const newTable = curentTalve.cloneNode(true);

    const editButton = newTable.querySelectorAll(".edit-row");
    const deleteRowButton = newTable.querySelectorAll(".delete-row");

    newTable
      .querySelector(".table-dublicate")
      .addEventListener("click", copyTable);

    newTable
      .querySelector(".table-remove")
      .addEventListener("click", removeTable);

    newTable.removeAttribute("id");

    for (const editButton of editButton) {
      editButton.addEventListener("click", editRow);
    }
    for (const deleteRowButton of deleteRowButton) {
      deleteRowButton.addEventListener("click", deleteRow);
    }

    curentTalve.after(newTable);
  };

  const removeTable = (event) => {
    event.preventDefault();
    event.target.closest(".table-wrap").remove();
  };

  return (
    <div>
      <div className="form-vertical">
        <h6>Form1</h6>
        <SubmitForms
          values={formFields}
          errorValues={formErrorFields}
          validateEmptyField={validateEmptyField}
          validateAgeField={validateAge}
          onChangeValue={fieldChange}
          submitForm={addRow}
        />
      </div>
      <div className="form-horizontal">
        <h6>Form2</h6>
        <SubmitForms
          values={formFields}
          errorValues={formErrorFields}
          validateEmptyField={validateEmptyField}
          validateAgeField={validateAge}
          onChangeValue={fieldChange}
          submitForm={addRow}
        />
      </div>

      <div className="popup-wrap" id="formEdit">
        <div className="popup-form">
          <h6>Modal form</h6>
          <form>
            <div className="form-inner">
              <div className="form-headline">
                Edit name
                <span className="close-modal" onClick={closeForm}></span>
              </div>
              <div className="clearfix">
                <div className={"field-wrap " + editFieldError.fieldName}>
                  <input
                    type="text"
                    name="fieldName"
                    value={editField.fieldName}
                    onChange={fieldChangeModal}
                    onBlur={validateEditFormField}
                  />
                  <span className="errorMsg">
                    Should not bee empty or input value contains number
                  </span>
                </div>
                <div className={"field-wrap " + editFieldError.fieldSurname}>
                  <input
                    type="text"
                    name="fieldSurname"
                    value={editField.fieldSurname}
                    onChange={fieldChangeModal}
                    onBlur={validateEditFormField}
                  />
                  <span className="errorMsg">
                    Should not bee empty or input value contains number
                  </span>
                </div>
                <div className={"field-wrap " + editFieldError.fieldCity}>
                  <input
                    type="text"
                    name="fieldCity"
                    value={editField.fieldCity}
                    onChange={fieldChangeModal}
                    onBlur={validateEditFormField}
                  />
                  <span className="errorMsg">
                    Should not bee empty or input value contains number
                  </span>
                </div>
              </div>
              <div className="clearfix">
                <div className={"field-wrap " + editFieldError.totalyAgree}>
                  <span className="errorMsg">Should be checked for save</span>
                  <label htmlFor="editConfirm">
                    <input
                      type="checkbox"
                      name="Agree with..."
                      id="editConfirm"
                      checked={editField.totalyAgree}
                      onChange={handleChange}
                    />
                    Totaly agree
                  </label>
                </div>
                <button type="submit" onClick={saveChanges}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="table-wrap ">
        <div className="clearfix">
          <button
            className="table-remove"
            onClick={() => alert("Main table should not be deleted")}
          >
            &nbsp;
          </button>
          <button className="table-dublicate" onClick={copyTable}>
            Copy table
          </button>
        </div>

        <table id="table-main">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>City</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>Surname</td>
              <td>Age</td>
              <td>City</td>
              <td>
                <div className="button-wrap">
                  <button className="edit-row" onClick={editRow}>
                    Edit
                  </button>
                  <button className="delete-row" onClick={deleteRow}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
