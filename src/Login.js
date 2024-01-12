// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const initialStateErrors = {
    name: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [errors, setErrors] = useState(initialStateErrors);

  const handleSubmit = (event) => {
    event.preventDefault();

    let newErrors = { ...initialStateErrors };
    let hasError = false;

    if (Inputs.name === "") {
      newErrors.name.required = true;
      hasError = true;
    }

    if (Inputs.password === "") {
      newErrors.password.required = true;
      hasError = true;
    }

    if (!hasError) {
      if (Inputs.name === "Loonslab" && Inputs.password === "123") {
        navigate('/weather');
        console.log("Login successful!");
      } else {
        newErrors.custom_error = "Invalid username or password";
        setErrors(newErrors);
      }
    }

    setErrors(newErrors);
  };

  const [Inputs, setInputs] = useState({
    name: "",
    password: "",
  });

  const handleInput = (event) => {
    setInputs({ ...Inputs, [event.target.name]: event.target.value });
  };

  return (
    <section className="register-block">
      
      <h1>Welcome To Weather-App</h1>
      <div className="container">
        <div className="row">
          <div className="col register-sec">
            <h2 className="text-center">Login Now</h2>
            <form onSubmit={handleSubmit} className="register-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Name
                </label>
                <input type="text" className="form-control" onChange={handleInput} name="name" id="" />
                {errors.name.required ? <span className="text-danger">Name is required.</span> : null}
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputPassword1" className="text-uppercase">
                  Password
                </label>
                <input className="form-control" type="password" onChange={handleInput} name="password" id="" />
                {errors.password.required ? <span className="text-danger">Password is required.</span> : null}
              </div>

              <div className="form-group">
                <span className="text-danger">
                  {errors.custom_error ? <p>{errors.custom_error}</p> : null}
                </span>

                <input type="submit" className="btn btn-login float-right" value="Login" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
