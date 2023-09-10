import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const submit = async () => {
    if (name === "") {
      toast.warning("Enter a food name to search");
    } else {
      setLoading(true);
      await axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}
    `
        )
        .then((res) => {
          if (res.data.meals === null) {
            setLoading(false);
            setData([]);
            setName("");
            toast.error("No food found");
          } else {
            setData(res.data.meals);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };
  return (
    <>
      <h1>Meal Finder 🍴</h1>
      <main className="main">
        <div className="search">
          <input
            type="text"
            placeholder="Enter food name..."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <button onClick={submit}>Search</button>
        </div>
      </main>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="food">
          {data.map((food, i) => (
            <figure key={i}>
              <img className="food-image" src={food.strMealThumb} alt="" />
              <p>{food.strMeal}</p>
              <button
                onClick={() => {
                  window.open(`${food.strYoutube}`, "_blank");
                }}
              >
                Watch Video
              </button>
            </figure>
          ))}
        </div>
      )}

      <ToastContainer />
    </>
  );
}

export default App;
