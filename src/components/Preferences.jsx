import React, { Component } from "react";

class Preferences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      userCuisines: [],
      cuisines: this.props.cuisines,
      zipcode: this.props.user.zipcode,
      radius: this.props.user.radius
    };
  }

  handleCheckBoxChange = event => {
    if (this.state.userCuisines.includes(event.target.id)) {
      let newPreferences = this.state.userCuisines.filter(id => {
        return id !== event.target.id;
      });
      this.setState({ userCuisines: newPreferences });
    } else {
      this.state.userCuisines.push(event.target.id);
    }
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
      event.preventDefault();
      fetch(`http://localhost:3000/api/users/${this.state.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
            zipcode: parseInt(this.state.zipcode),
            radius: parseInt(this.state.radius)
        })
      })
        .then(resp => resp.json())
        .then(response => {
          console.log(response)
          // localStorage.setItem("jwt", response.jwt);
          // this.setState({ 
          //   zipcode: response.user });
          // this.createCuisinePreferences(this.state.user)
          // this.getRecentUserInfo() 
        })
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.history.push('/home')
  }

  render() {
    console.log("Preferences State = ", this.state);
    return (
      <form onSubmit={this.handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
            <div className="form-group">
              <h4>
                <b>preferences:</b>
              </h4>
              <small>
                <i>update your food preferences!</i>
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
                        onChange={this.handleCheckBoxChange}
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
                <i>update your zipcode.</i>
              </small>
              <input
                className="form-control"
                name="zipcode"
                id="zipcode"
                type="text"
                placeholder="5 digit zip-code"
                value={this.state.zipcode}
                onChange={this.handleChange}
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
                placeholder="Miles"
                value={this.state.radius}
                onChange={this.handleChange}
              />
              <input
                type="submit"
                value="Update preferences!"
                className="button"
                style={{ width: "100%%", marginLeft: "auto", marginRight: "auto" }}
              />
              <small style={{ color: '#5C5932'}}>All finished? <b onClick={(e) => this.props.handlePreferences()} className="link">Go back home.</b></small>
            </div>
          </div>
        </div>
      </div>
      </form>
    );
  }
}

export default Preferences;
