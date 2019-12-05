import React from "react";
import { Form } from "semantic-ui-react";

export default class Step1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <>
        <Form.Field>
          <label>first name:</label>
          <input
            placeholder="first name"
            id="name"
            name="name"
            type="text"
            value={this.props.name}
            onChange={this.props.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>email:</label>
          <small>
            <i>don't worry -- we'll never share your info.</i>
          </small>
          <input
            placeholder="email"
            id="email"
            name="email"
            type="text"
            value={this.props.email}
            onChange={this.props.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>password:</label>
          <input
            placeholder="********"
            id="password"
            name="password"
            type="password"
            value={this.props.password}
            onChange={this.props.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <label>password confirmation:</label>
          <input
            placeholder="********"
            id="password_confirmation"
            name="password_confirmation"
            type="password"
            value={this.props.password_confirmation}
            onChange={this.props.handleChange}
          />
        </Form.Field>
        <div className="img-div">
          <img
            src="./roulette-svgrepo-com.svg"
            className="rotate"
            style={{
              maxWidth: "250px",
              margin: "0 auto 0 auto",
              position: "fixed",
              bottom: "5%",
              right: "5%"
            }}
          />
        </div>
      </>
    );
  }
}
