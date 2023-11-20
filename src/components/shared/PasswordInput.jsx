import { Icon } from "@iconify/react";
import React, { useState } from "react";

const PasswordInput = ({ label }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordShow = () => {
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  return (
    <div className="flex flex-col ">
      <label htmlFor={"password"} className="sm-bold-text mb-2">
        {label}
      </label>
      <div className="password_box flex p-2 border-solid border-gray-500 border-2 rounded-md justify-center items-center ">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          placeholder="Password"
          className="border-0 w-full focus:outline-none"
          autoComplete="off"
          required={true}
        />
        <button
          onClick={handlePasswordShow}
          className="hover:opacity-100 opacity-0 transition duration-300 ease-in-out"
        >
          {showPassword ? (
            <Icon icon={"clarity:eye-hide-solid"} width={22} />
          ) : (
            <Icon icon={"mdi:eye"} width={22} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
