import React, { Component } from 'react';

export default class Step1 extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
      if (this.props.currentStep !== 1) {
        return null
      }
      return(
        <div>
          
        <div className="form-group" style={{ width: '40%', marginLeft: 'auto', marginRight: 'auto', padding: '15px'}}>
        <label><b>first name:</b></label>
        <input 
            className="form-control"
            id="name"
            name="name"
            type="text"
            value={this.props.name}
            onChange={this.props.handleChange} 
            />
          <label><b>email:</b></label>
          <br />
          <small><i>don't worry -- we'll never share your info.</i></small>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            value={this.props.email} 
            onChange={this.props.handleChange} 
          />
          <label><b>password:</b></label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            value={this.props.password} 
            onChange={this.props.handleChange}
          />
          <label><b>password confirmation:</b></label>
          <input
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={this.props.password_confirmation} 
            onChange={this.props.handleChange}
          />
                <div className="img-div">
                    <img src="./roulette-svgrepo-com.svg" className="rotate" style={{ maxWidth: "250px", margin: "0 auto 0 auto", position: "fixed", bottom: "5%", right: "5%" }}/>
                </div>
          </div>
        </div>
        
      )
    }
  }