import React, {
  useState,
  useContext,
  useEffect,
} from "react";
import { useCallback } from "react";

const url =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("a");
  const [myDrinks, setMyDrinks] = useState([]);

  const fetchDrinks = useCallback(async () => {
    try {
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const { drinks } = data;
      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            strAlcoholic,
            strGlass,
          } = item;
          return {
            id: idDrink,
            name: strDrink,
            img: strDrinkThumb,
            type: strAlcoholic,
            glass: strGlass,
          };
        });
        setMyDrinks(newDrinks);
      } else {
        setMyDrinks([]);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      value={{
        loading,
        myDrinks,
        setSearchTerm,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
