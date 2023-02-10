import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss'

const defaultformFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields);
  const { password, email } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultformFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert('incorrect password for email');
          break;
        case "auth/user-not-found": 
          alert('no user assosiated with this email');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email" 
          required 
          onChange={handleChange}
          name="email"
          value={email} 
        > 
        </FormInput>

        <FormInput
          label="Password"
          type="password" 
          required 
          onChange={handleChange}
          name="password"
          value={password}   
        >
        </FormInput>

        <div className='buttons-container'> 
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button> 
        </div>
      </form>
    </div>
  );
};

export default SignInForm;