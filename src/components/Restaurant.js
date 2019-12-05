import React from "react";

const Restaurant = props => {
  const rating = props.restaurant.rating.toFixed(1);
  return (
    <div>
      <h3>{props.restaurant.name}</h3>
      <p>
        <b>Address: </b>
        {props.restaurant.vicinity}
      </p>
      <p>
        <b>Rating: </b>
        {rating} out of {props.restaurant.user_ratings_total} user reviews
      </p>
    </div>
  );
};

export default Restaurant;
