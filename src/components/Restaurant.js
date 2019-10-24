import React, { Component } from 'react';

const Restaurant = (props) => {
    return(
        <div>
            <h3>{props.restaurant.name}</h3>
            <p><b>Rating: </b>{props.restaurant.rating}</p>
            <p><b>Address: </b>{props.restaurant.vicinity}</p>
            <p><b>Rating: </b>{props.restaurant.rating}</p>
        </div>

    )
};


export default Restaurant