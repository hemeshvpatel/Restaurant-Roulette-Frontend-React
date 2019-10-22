import React, { Component } from 'react';
import Step1 from './Step1'; 
import Step2 from './Step2';

export default class Signup extends Component {
    constructor(props) {
        super(props)

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
            preferences: [],
            user: '',
            isSignedUp: false
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
                localStorage.setItem("jwt", response.jwt)
                this.setState({ user: response.user })
            })
            .then(this.createCuisinePreferences)
        }
        else 
        alert("Passwords don't match - try again!")
    }

    createCuisinePreferences = () => {
        this.state.preferences.map(cuisine_id => {
            fetch('http://localhost:3000/api/cuisine_preferences', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                body: JSON.stringify({
                        "user_id": this.state.user.id,
                        "cuisine_id": parseInt(cuisine_id, 10)
                    })
                })
                .then(resp => resp.json())
                .then(response => {
                    this.props.signedIn(true)
                    console.log(response)
                })
        })
        
    }

    handleCheckBoxChange = (event) => {
        if (this.state.preferences.includes(event.target.id)){
            let newPreferences = this.state.preferences.filter(id => {
                return id !== event.target.id
            })
            this.setState({ preferences: newPreferences })
        } else {
            this.state.preferences.push(event.target.id)
        }
    }   
    
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
                    handleCheckBoxChange={this.handleCheckBoxChange}
                    cuisines={this.props.cuisines}
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