import React, { Component } from 'react';

export default class Login extends Component {
    render() {
        return(
            <div>
                <form>
                <label> email:
                <input type="text" name="email" /> <br />
                </label>
                <label>password:
                <input type="password" name="password" /><br />
                </label>
                <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}