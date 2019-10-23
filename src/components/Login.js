import React, { Component } from 'react';
import Signup from './Signup';
import { Link } from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password:  '',
            user: ''
        }
    }

    handleChange = (event) => {
        event.persist();
        this.setState ({
          [event.target.name]: event.target.value
        })
    }

    handleLogin = (event) => {
        event.preventDefault()
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            },
            body: JSON.stringify({
                "user": {
                    "email": this.state.email,
                    "password": this.state.password
                  }
            })
        })
        .then(resp => resp.json())
        .then(response => {
            localStorage.setItem("jwt", response.jwt)
            this.setState({ user: response.user })
            this.props.userLogIn(response.user)
            this.props.loggedIn(true)
            this.props.history.push('/home')
        })
    }

    // handleLogout = (event) => {
    //     event.preventDefault()
    //     localStorage.removeItem("jwt")
    //     this.setState ({ user: '' })
    // }

    handleClick = () => {
        this.props.history.push('/signup')
    }
    
    
    
    render() {
        return(
            <div>
                <h1>Login</h1>
                <form onSubmit={(event) => this.handleLogin(event)}>
                <label> email:
                <input type="text" name="email" value={this.state.value} onChange={this.handleChange} /> <br />
                </label>
                <label>password:
                <input type="password" name="password" value={this.state.value} onChange={this.handleChange}/><br />
                </label>
                <input type="submit" value="Login" className="btn btn-primary"/><br />
                <button className="btn btn-primary" onClick={this.handleClick}>Sign Up</button>
                </form>
            </div>
        )
    }
}