import React, { Component } from "react";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userCuisines: this.props.user.cuisine_preferences,
      cuisines: this.props.cuisines
    };
  }
  render() {
    console.log("Preferences State = ", this.state);
    return (
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="form-group">
              <h4>
                <b>preferences:</b>
              </h4>
              <small>
                <i>what kind of food do you like?</i>
              </small>
              <br />
              {this.state.cuisines.map((cuisine, index) => {
                return (
                  <div class="form-check form-check-inline">
                    <label class="form-check-label" key={index}>
                      {cuisine.kind}
                      <input
                        class="form-check-input"
                        id={cuisine.id}
                        name={cuisine.kind}
                        value={this.props.isChecked}
                        type="checkbox"
                        onChange={this.props.handleCheckBoxChange}
                      />
                    </label>
                  </div>
                );
              })}
              <br />
              <h4>
                <b>zipcode:</b>
              </h4>
              <small>
                <i>where are you normally searching for dinner?</i>
              </small>
              <input
                className="form-control"
                name="zipcode"
                id="zipcode"
                type="text"
                placeholder="5 digit zip-code"
                value={this.state.zipcode}
                onChange={this.props.handleChange}
              />
              <br />
              <h4>
                <b>radius:</b>
              </h4>
              <small>
                <i>how far are you willing to travel for grub?</i>
              </small>
              <input
                className="form-control"
                name="radius"
                id="radius"
                type="text"
                placeholder="Radius"
                value={this.props.radius}
                onChange={this.props.handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preferences;
