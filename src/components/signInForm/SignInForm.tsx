import { FormEvent } from "react";

import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

export default function SignInForm(): React.ReactElement {
  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("remember-me") === "on";

    const payload = { username, password, rememberMe };
    console.log(payload);
    navigate("/user/" + username);
  }
  return (
    <form className="sign-in-form" onSubmit={handleSubmit}>
      <div className="sign-in-form__input-wrapper">
        <label htmlFor="username">Username</label>
        <input required type="text" id="username" name="username" />
      </div>
      <div className="sign-in-form__input-wrapper">
        <label htmlFor="password">Password</label>
        <input required type="password" id="password" name="password" />
      </div>
      <div className="sign-in-form__input-remember">
        <input type="checkbox" id="remember-me" name="remember-me" />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      <Button label="Sign in" type="submit" />
    </form>
  );
}
