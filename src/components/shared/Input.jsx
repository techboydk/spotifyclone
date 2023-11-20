import React from "react";

const Input = ({ type, name, placeholder, id, label, required }) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="sm-bold-text mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className="p-2 border-solid border-gray-500 border-2 rounded-md"
        autoComplete="off"
        required={required}
      />
    </div>
  );
};

export default Input;
