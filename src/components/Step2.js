import React, { Component } from "react";
import { Form, Dropdown, Checkbox, Button } from "semantic-ui-react";

export default class Step2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const cuisines = this.props.cuisines.map((cuisine, index) => {
      return {
        key: cuisine.id,
        text: cuisine.kind,
        value: cuisine.kind
      };
    });
    if (this.props.currentStep === 1) {
      return null;
    }
    return (
      <>
        <Form>
          <Form.Field>
            <h1>Preferences</h1>
            <small>What kind of food do you like?</small>
            <Form.Field>
              <Dropdown
                placeholder="Choose Your Cuisines"
                fluid
                multiple
                search
                selection
                options={cuisines}
                onChange={(event, data) =>
                  this.props.handleCheckBoxChange(event, data)
                }
                value={this.props.isChecked}
              />
            </Form.Field>
            <label>Zipcode</label>
            <input
              placeholder="zipcode"
              id="zipcode"
              name="zipcode"
              type="text"
              value={this.props.zipcode}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Radius</label>
            <input
              placeholder="radius"
              id="radius"
              name="radius"
              type="text"
              value={this.props.radius}
              onChange={this.props.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </>
      // <div className="container">
      //   <div className="row">
      //     <div className="col-4"></div>
      //     <div className="col-4">
      //       <div className="form-group">
      //         <h4>
      //           <b>preferences:</b>
      //         </h4>
      //         <small>
      //           <i>what kind of food do you like?</i>
      //         </small>
      //         <br />
      //         {this.props.cuisines.map((cuisine, index) => {
      //           return (
      //             <div className="form-check form-check-inline">
      //               <label className="form-check-label" key={index}>
      //                 {cuisine.kind}
      //                 <input
      //                   className="form-check-input"
      //                   id={cuisine.id}
      //                   name={cuisine.kind}
      //                   value={this.props.isChecked}
      //                   type="checkbox"
      //                   onChange={this.props.handleCheckBoxChange}
      //                 />
      //               </label>
      //             </div>
      //           );
      //         })}
      //         <br />
      //         <h4>
      //           <b>zipcode:</b>
      //         </h4>
      //         <small>
      //           <i>where are you normally searching for dinner?</i>
      //         </small>
      //         <input
      //           className="form-control"
      //           name="zipcode"
      //           id="zipcode"
      //           type="text"
      //           placeholder="5 digit zip-code"
      //           value={this.props.zipcode}
      //           onChange={this.props.handleChange}
      //         />
      //         <br />
      //         <h4>
      //           <b>radius:</b>
      //         </h4>
      //         <small>
      //           <i>how far are you willing to travel for grub?</i>
      //         </small>
      //         <input
      //           className="form-control"
      //           name="radius"
      //           id="radius"
      //           type="text"
      //           placeholder="Miles"
      //           value={this.props.radius}
      //           onChange={this.props.handleChange}
      //         />
      //       </div>
      //       <div className="col-4">
      //         <div className="img-div">
      //           <img
      //             src="./roulette-svgrepo-com.svg"
      //             className="rotate"
      //             style={{
      //               maxWidth: "250px",
      //               margin: "0 auto 0 auto",
      //               position: "fixed",
      //               bottom: "5%",
      //               right: "5%"
      //             }}
      //           />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}
