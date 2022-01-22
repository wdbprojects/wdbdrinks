import React from "react";
import DrinkList from "../components/DrinkList";
import SearchForm from "../components/SearchForm";

const Home = () => {
  return (
    <main>
      <SearchForm />
      <DrinkList />
    </main>
  );
};

export default Home;
