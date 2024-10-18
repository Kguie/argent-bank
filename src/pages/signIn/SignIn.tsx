import SignInForm from "../../components/signInForm/SignInForm";

export default function SignIn() {
  return (
    <main className="sign-in">
      <section className="sign-in__content">
        <i className="fa fa-user-circle sign-in__content__icon"></i>
        <h2>Sign In</h2>
        <SignInForm />
      </section>
    </main>
  );
}
