import React, { useState, useEffect } from "react";
import "./recipe-view.css";
import { useParams } from "react-router-dom";
import API, { recipeImageUrl } from "../../utils/API";
import cutleryImg from '../../assets/images/cutlery.jpg';
import { Cookie } from "../../assets/icons/cookie";
import { GreyCookie } from "../../assets/icons/grey-cookie";
import { PiggyBank } from "../../assets/icons/piggy-bank";

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
                <p className="col-sm">Difficulty: <span>{<Cookie></Cookie>}
                  {recipe.difficulty > 1 ? <Cookie></Cookie> : <GreyCookie></GreyCookie>}
                  {recipe.difficulty > 2 ? <Cookie></Cookie> : <GreyCookie></GreyCookie>}</span></p>
                <p className="col-sm">Cheap: <PiggyBank color="#f614b2"></PiggyBank>
                  <PiggyBank color={recipe.cheap > 1 ? '#f614b2' : '#ffccf0 '}></PiggyBank>
                  <PiggyBank color={recipe.cheap > 2 ? '#f614b2' : '#ffccf0 '}></PiggyBank></p>
              </div>
            </article>
          </div>
        : <div>Loading...</div>
      }
    </section>
  )
}