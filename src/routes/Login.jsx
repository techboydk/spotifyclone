import React from "react";
import { Icon } from "@iconify/react";
import EmailInput from "../components/shared/Input";
import PasswordInput from "../components/shared/PasswordInput";
import Button from "../components/shared/Button";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="flex items-center justify-center p-5 border-solid border-b-[1px] border-gray-400 w-full">
        <Icon icon="logos:spotify" width={"140"} />
      </div>
      <p className="sm-bold-text m-3">To continue, Log in to spotify.</p>
      <div className="input_container m-3 w-1/3 gap-4 flex flex-col">
        <EmailInput
          type={"email"}
          name={"email"}
          placeholder={"Email address or Username"}
          label={"Email address or Username"}
        />
        <PasswordInput label={"Password"} />
        <div className="flex items-center justify-between">
          <Link>Forget Your Password?</Link>
          <Button name={"Login"} />
        </div>
      </div>
    </div>
  );
};

export default Login;
