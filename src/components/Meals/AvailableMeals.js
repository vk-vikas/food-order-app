import { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = () => {
  //we will get data after the component is rendered so we need to use state
  // for our fetched data so that when we recieve the data , we rerender it
  const [meals, setMeals] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://udemy-react-edf79-default-rtdb.firebaseio.com//meals.json"
      );
      const responseData = await response.json();
      // returned data is object , we need array
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if(isloading){
    return (
      <div className={classes.mealsLoading}>
        <h3>Loading...</h3>
      </div>
    )
  }
  const mealsList = meals.map((i) => (
    <MealItem
      key={i.id}
      id={i.id}
      name={i.name}
      description={i.description}
      price={i.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
