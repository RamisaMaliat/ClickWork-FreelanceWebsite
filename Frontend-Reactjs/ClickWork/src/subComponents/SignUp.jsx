import React, { Component } from "react"
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { isIndexedAccessTypeNode } from "typescript";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      SignUpValid: false
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password1, password2, email, acctype } = event.target.elements;

    if (password1.value == password2.value) {
      fetch(process.env.REACT_APP_API + 'freelancer/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'username': username.value,
          'password': password1.value,
          'email': email.value,
          'user_type': acctype.value
        })
      })
        .then(res => res.json())
        .then((result) => {
          if(result[0]){
            alert(result[1]);
            this.setState({ SignUpValid: true })
          }
          else{
            alert(result[1]);
          }
            
        },
          (error) => {
            alert('Failed');
          })
    }
    else {
      alert('Confirm the password.');
    }

  }

  render() {
    const { SignUpValid } = this.state;

    if (SignUpValid) {
      return <Redirect push to="/ViewMyProfile" />
    }

    return (

      <signup class="text-center sign-body">

        <main class="form-signin">
          <form onSubmit={this.handleSubmit} method="POST">
            <img class="mb-4" src="https://media.istockphoto.com/vectors/woman-with-laptop-sitting-in-nature-and-leaves-concept-illustration-vector-id1139913278?k=6&m=1139913278&s=612x612&w=0&h=vDks140zgZAaCDrxSW0C4IabyHQI7aM8uw0MfM7gMrs=" alt="iphone-mockup" width="100" height="77" />
            <h1 class="h3 mb-3 fw-normal signup-title"><b>Sign Up</b></h1>

            <div class="form-floating">
              <label for="floatingInput" class="pass">Username</label>
              <input type="text" class="form-control" id="floatingInput" placeholder="Username" name="username" />
            </div>
            <div class="form-floating">
              <label for="floatingInput" class="pass">Email</label>
              <input type="email" class="form-control" id="floatingInput" placeholder="Email" name="email" />
            </div>

            <div class="form-floating">
              <label for="floatingInput" class="pass">Password</label>
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" name="password1" />
            </div>

            <div class="form-floating">
              <label for="floatingInput" class="pass">Confirm</label>
              <input type="password" class="form-control confirm" id="floatingPassword" placeholder=" Confirm Password" name="password2" />
            </div>

            <div class="checkbox mb-3">
              <label class="acc-type">
                <input type="radio" value="Freelancer" name="acctype" /> Freelancer Account
              </label>
              <label class="acc-type">
                <input type="radio" value="Client" name="acctype" /> Client Account
              </label>
            </div>
            <button class="w-100 btn btn-lg btn-dark" type="submit">Sign Up</button>
            <p class="mt-5 mb-3 text-muted">&copy; ClickWork</p>
          </form>
        </main>
      </signup>

    );
  }

}

export default Signup;
