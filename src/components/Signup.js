import React, { Component } from 'react';
import Step1 from './Step1'; 
import Step2 from './Step2';

export default class Signup extends Component {
    constructor() {
        super()

        this._next = this._next.bind(this)
        this._prev = this._prev.bind(this)

        this.state = {
            currentStep: 1,
            name: '',
            email: '',
            password:  '',
            password_confirmation: '',
            zipcode: 0,
            radius: 0,
            preferences: []
        }
    }

    handleChange = (event) => {
        this.setState ({ 
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        if (this.state.password === this.state.password_confirmation) {
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
        else 
        alert("Passwords don't match - try again!")
    }

    // handleCheckBoxSubmit = (event) => {
    //     fetch request to cuisine preferences - post method. 
    //     save all preferences into an array in state - then
    //     .map through the array and do a fetch request to database for each cuisine
    // }
    
    _next() {
        let thisStep = this.state.currentStep
        thisStep = thisStep >= 1? 2: thisStep + 1
        this.setState({
            currentStep: thisStep
        })
    }

    _prev() {
        let thisStep = this.state.currentStep;
        thisStep = thisStep <= 1? 1: thisStep - 1
        this.setState({
            currentStep: thisStep
        })
    }

    get previousButton(){
        let currentStep = this.state.currentStep;
        if(currentStep !==1){
          return (
            <button 
                className="btn btn-secondary" 
                type="button" onClick={this._prev}>
                Previous
            </button>
          )
        }
        return null;
      }
      
      get nextButton(){
        let currentStep = this.state.currentStep;
        if(currentStep === 1){
          return (
            <button 
                className="btn btn-primary float-right" 
                type="button" onClick={this._next}>
                Next
            </button>        
          )
        }
        return null;
      }

      get submitButton() {
          if(this.state.currentStep === 2){
              return(
                <input type="submit" value="Create Account" />
              )
          }
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
                    name={this.state.name}
                    email={this.state.email}
                    password={this.state.password}
                    password_confirmation={this.state.password_confirmation}
                    />
                    <Step2 
                    preferences={this.state.preferences}
                    currentStep={this.state.currentStep} 
                    handleChange={this.handleChange}
                    zipcode={this.state.zipcode}
                    radius={this.state.radius}
                    />
                    {this.previousButton}
                    {this.nextButton} 
                    {this.submitButton}
                </form>
                </React.Fragment>
            </div>
            
        )
    }
}