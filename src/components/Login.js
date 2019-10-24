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
                    this.setState({ user: response.user})
                    localStorage.setItem("jwt", response.jwt)
                    this.getUserCuisine();
                    this.props.history.push("/home")
                
            })
        }

        getUserCuisine = () => {
            fetch(`http://localhost:3000/api/users/${this.state.user.id}`)
            .then(resp => resp.json())
            .then(user => {
                this.setState({ user: user })
                this.props.userLogIn(user)
            })
        }


    handleClick = () => {
        this.props.history.push('/signup')
    }
    
    
    
    render() {
        return(
            <div>
            <div className="pb-2 mt-4 mb-2">
                    <h1 className="header" style={{ fontSize: '75px'}}>Restaurant Roulette</h1>
                    </div>
            <div className="container">
                <div className="row">
                    <div className="col-4"></div>
                    <div className="col-4">
                        <form onSubmit={(event) => this.handleLogin(event)}>
                        <div className="form-group">
                            <label><b>email:</b></label>
                            <input type="text" name="email" className="form-control" value={this.state.value} onChange={this.handleChange} /> <br />
                            <label><b>password:</b></label>
                            <input type="password" name="password" className="form-control" value={this.state.value} onChange={this.handleChange}/><br />
                        </div>
                        <input type="submit" value="Login" className="button"/><br />
                        <small style={{ color: '#5C5932'}}>Not a member? <b onClick={this.handleClick} className="link">Sign up.</b></small>
                        </form>
                    </div>
                </div>
                <div className="col-4">
                    <div className="img-div">
                        <img src="./roulette-svgrepo-com.svg" className="rotate" style={{ maxWidth: "250px", margin: "0 auto 0 auto", position: "fixed", bottom: "5%", right: "5%" }}/>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}