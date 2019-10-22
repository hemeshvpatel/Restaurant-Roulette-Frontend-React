import React, { Component } from 'react';
import Step1 from './Step1'; 
import Step2 from './Step2';

export default class Signup extends Component {
    constructor() {
        super()

        this.state = {
            currentStep: 1,
            name: '',
            email: '',
            password:  '',
            password_confirmation: '',
            zipcode: 0,
            radius: 0
        }
    }

    handleChange = (event) => {
        this.setState ({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/api/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json' 
            },
            body: JSON.stringify({
                "user": {
                    "name": this.state.name,
                    "email": this.state.email,
                    "password": this.state.password,
                    "password_confirmation": this.state.password_confirmation,
                    "zipcode": this.state.zipcode,
                    "radius": this.state.radius
                  }
            })
        })
        .then(resp => resp.json())
        .then(response => {
            console.log(response)
        })
    }
    
    render() {
        return(
            <div>
                <React.Fragment>
                <h1>Sign Up</h1>
                <p>Step {this.state.currentStep} </p> 
                    
                <form onSubmit={this.handleSubmit}>
                    <Step1 
                    currentStep={this.state.currentStep} 
                    handleChange={this.handleChange}
                    email={this.state.email}
                    />
                    <Step2 
                    currentStep={this.state.currentStep} 
                    handleChange={this.handleChange}
                    username={this.state.username}
                    />      

                </form>
                </React.Fragment>
            </div>
            
        )
    }
}