import React from "react";

const Button = ({ name }) => {
  return (
    <Button className="flex justify-center items-center px-5 py-2 border-solid border-2 rounded-full w-fit bg-green-400">
      {name}
    </Button>
  );
};

export default Button;
