import React, { Component } from 'react';

export default class Step2 extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        if (this.props.currentStep === 1) {
            return null
        }
        return (
            <div className="form-group">
                <h3>Preferences:</h3>
                <label>vegetarian
                <input
                id="vegetarian"
                name="vegetarian"
                type="checkbox"
                 />
                </label>
                <label>vegan
                <input
                id="vegan"
                name="vegan"
                type="checkbox"
                 />
                </label>
                <label>mexican
                <input
                id="mexican"
                name="mexican"
                type="checkbox"
                 />
                </label>
                <label>chinese
                <input
                id="chinese"
                name="chinese"
                type="checkbox"
                 />
                </label>
                <label>sushi
                <input
                id="sushi"
                name="sushi"
                type="checkbox"
                 />
                </label>
                <h3>Zip Code</h3>
                <input 
                className=""
                name="zipcode"
                id="zipcode"
                type="text"
                placeholder="5 digit zip-code"
                value={this.props.zipcode}
                onChange={this.props.handleChange} 
                />
                <h3>Radius</h3>
                <input 
                className=""
                name="radius"
                id="radius"
                type="text"
                placeholder="Radius"
                value={this.props.radius}
                onChange={this.props.handleChange} 
                />
            </div>
        )
    }
}