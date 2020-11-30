import React, { useState, useEffect } from "react";
import "./recipe-view.css";
import { useParams } from "react-router-dom";
import API, { recipeImageUrl } from "../../utils/API";
import cutleryImg from '../../assets/images/cutlery.jpg';

export const RecipeView = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    async function getRecipe() {
      try {
        const res = await API.getRecipe(id);
        setRecipe(res.data.recipe);
      } catch (err) {
        console.error(err);
      }
    }
    getRecipe();
  }, [id]);

  return (
    <section>
      {
        recipe
        ? <div className="recipe-view">
            <h1 className="recipe-title">{recipe.title}</h1>
            {
              recipe.imageId
              ? <img className="image-view" src={`${recipeImageUrl}/${recipe.imageId}`} alt="recipe ready to eat" />
              : <img className="image-view" src={cutleryImg} alt="cutlery" />
            }
            <article className="container info-group">
              <div className="row">
                <p className="col-sm">Time: {recipe.preparingTime + recipe.bakingTime} min</p>
                <p className="col-sm">People: {recipe.people}</p>
                <p className="col-sm">Difficulty: {recipe.difficulty}</p>
                <p className="col-sm">Cheap: {recipe.cheap}</p>
              </div>
            </article>
          </div>
        : <div>Loading...</div>
      }
    </section>
  )
}