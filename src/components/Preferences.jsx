import React, { Component } from "react";

class Preferences extends Component {
  render() {
    return (
      <div>
        <h1>Your Preferences:</h1>
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
          />
          <label class="form-check-label" for="defaultCheck1">
            Cuisine Types
          </label>
        </div>
      </div>
    );
  }
}

export default Preferences;
