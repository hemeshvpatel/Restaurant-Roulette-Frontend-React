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
        <div className="form-group">
        <label>First Name</label>
        <input 
            className="form-control"
            id="name"
            name="name"
            type="text"
            placeholder="Enter first name"
            value={this.props.name}
            onChange={this.props.handleChange} 
            />
          <label>Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.props.email} 
            onChange={this.props.handleChange} 
          />
          <label>Password</label>
          <input
            className="form-control"
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={this.props.password} 
            onChange={this.props.handleChange}
          />
          <label>Password Confirmation</label>
          <input
            className="form-control"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            placeholder="Re-enter password"
            value={this.props.password_confirmation} 
            onChange={this.props.handleChange}
          />
        </div>
      )
    }
  }