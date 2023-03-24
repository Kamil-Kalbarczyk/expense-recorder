import { useState } from "react";
import { SignIn } from "./sign-in";
import { SignUp } from "./sing-up";

export const Login = () => {
  const [loginMethod, setLoginMethod] = useState("signIn");

  if (loginMethod === "signIn") {
    return <SignIn setLoginMethod={setLoginMethod} />;
  } else {
    return <SignUp setLoginMethod={setLoginMethod} />;
  }
};
