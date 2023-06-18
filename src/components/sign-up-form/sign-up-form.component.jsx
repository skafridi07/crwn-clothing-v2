import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  console.log("hit");
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("name:", name);
    console.log("value:", value);
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    try {
      // response has a user object so we destructed it
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      // After successful creation of user reset the form fields
      resetFormField();
      console.log(user);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      } else if (error.code === "auth/weak-password") {
        alert("Your password is either short short or too weak");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          type="text"
          required
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
