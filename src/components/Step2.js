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
                {this.props.cuisines.map((cuisine, index) => {
                    return <label key={index}>{cuisine.kind}
                    <input 
                    id={cuisine.id}
                    name={cuisine.kind}
                    value={this.props.isChecked}
                    type="checkbox"
                    onChange={this.props.handleCheckBoxChange}
                    />
                    </label>
                    })}
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