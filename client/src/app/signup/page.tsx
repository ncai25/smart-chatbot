import React from "react";
import { SignUpForm } from "./components/SignUpForm";
import { deflate } from "zlib";

const SignUpPage = () => {
  return (
    <div className="flex h-svh items-center">
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
