import React, { useState, useEffect } from "react";
import "./recipe-view.css";
import { useParams } from "react-router-dom";
import API from "../../utils/API";

export const RecipeView = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      const res = await API.getRecipe(id);
      setRecipe(res.data.recipe);
    }
    getRecipe();
  }, []);

  return (
    <section>
      {
        recipe
        ? <div>{recipe.title}</div>
        : <div>Loading</div>
      }
    </section>
  )
}