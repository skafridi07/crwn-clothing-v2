import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log("name:", name);
    // console.log("value:", value);
    setFormFields({ ...formFields, [name]: value });
    // console.log(formFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //response is an object so we destructured it to get the user
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(user);
      resetFormField();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email");
          break;
        default:
          console.log(error);
      }
    }
  };

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    //we moved the document creation to onAuthStateChnaged in userContext
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          onChange={handleChange}
          type="email"
          required
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          type="password"
          required
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={signInWithGoogle}
            buttonType={BUTTON_TYPE_CLASSES.google}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
