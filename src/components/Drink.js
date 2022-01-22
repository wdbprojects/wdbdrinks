import React from "react";
import { Link } from "react-router-dom";

const Drink = ({ img, name, glass, id, type }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        <img src={img} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{type}</p>
        <Link
          to={`/drink/${id}`}
          className="btn btn-primary btn-detail">
          details
        </Link>
      </div>
    </article>
  );
};

export default Drink;
