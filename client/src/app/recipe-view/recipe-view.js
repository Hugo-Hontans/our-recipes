import React, { useState, useEffect } from "react";
import "./recipe-view.css";
import { useParams } from "react-router-dom";
import API, { recipeImageUrl } from "../../utils/API";
import cutleryImg from '../../assets/images/cutlery.jpg';
import { Cookie } from "../../assets/icons/cookie";
import { GreyCookie } from "../../assets/icons/grey-cookie";
import { PiggyBank } from "../../assets/icons/piggy-bank";
import { Badge } from "react-bootstrap";

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
            <div className="badges">
              { recipe.tags.map((tag, index) => 
              <Badge pill variant="info" key={index}>
                {tag}
              </Badge>
              )}
              </div>

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

            <article>
              <h2 className="ingredients">Ingredients</h2>
              { recipe.ingredients.map((ingredient, index) => <p key={index}>{ingredient}</p>) }
            </article>

            <article>
              <h2 className="ingredients instructions">Instructions</h2>
                <h5 className="preparing-time"><span className="bold-time">Preparing time:</span> {recipe.preparingTime} min</h5>
                <h5 className="baking-time"><span className="bold-time">Baking time:</span> {recipe.bakingTime} min</h5>
              { recipe.instructions.map((instruction, index) => <p className="instruction" key={index}><span className="instruction-number">{index + 1}.</span> {instruction}</p>) }
            </article>
            
            <div className="quote-group">
              <p className="quote-autor">Created by <span className="autor">{recipe.userName}</span>.</p>
              <p className="quote"><span className="quote-mark">"</span> {recipe.quote} <span className="quote-mark">"</span></p>
            </div>
          </div>
        : <div>Loading...</div>
      }
    </section>
  )
}