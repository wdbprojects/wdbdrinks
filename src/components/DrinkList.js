import React from "react";
import Drink from "./Drink";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const DrinkList = () => {
  const { myDrinks, loading } = useGlobalContext();
  if (loading) {
    return <Loading />;
  }
  if (myDrinks.length < 1) {
    return (
      <h2 className="section-title">
        no drinks match your criteria
      </h2>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">my drinks</h2>
      <div className="cocktails-center">
        {myDrinks.map((item) => {
          return <Drink key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default DrinkList;
