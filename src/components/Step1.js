import React, { Component } from 'react';

export default class Step1 extends React.Component {
    render() {
      if (this.props.currentStep !== 1) { // Prop: The current step
        return null
      }
      return(
        <div className="form-group">
        <label>First Name</label>
        <input 
            className=""
            id="name"
            type="text"
            placeholder="Enter first name"
            value={this.props.name}
            onChange={this.props.handleChange} 
            />
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={this.props.email} // Prop: The email input data
            onChange={this.props.handleChange} // Prop: Puts data into state
          />
        </div>
      )
    }
  }