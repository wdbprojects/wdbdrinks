import React, { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url =
  "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleDrink = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [drink, setDrink] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function getDrink() {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: img,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
          } = data.drinks[0];
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
          ];

          const newDrink = {
            name,
            img,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };
          setDrink(newDrink);
        } else {
          setDrink(null);
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
    getDrink();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!drink) {
    return (
      <h2 className="section-title">
        No drink to display!
      </h2>
    );
  }

  const {
    name,
    img,
    category,
    info,
    glass,
    instructions,
    ingredients,
  } = drink;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={img} alt={name} />
        <div className="drink-inf">
          <p>
            <span className="drink-data">name: </span>
            {name}
          </p>
          <p>
            <span className="drink-data">category: </span>
            {category}
          </p>
          <p>
            <span className="drink-data">info: </span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass: </span>
            {glass}
          </p>
          <p>
            <span className="drink-data">
              ingredients:{" "}
            </span>
            {ingredients.map((item, index) => {
              return item ? (
                <span key={index}>{item}</span>
              ) : null;
            })}
          </p>
          <p>
            <span className="drink-data">
              instructions:{" "}
            </span>
            {instructions}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleDrink;
