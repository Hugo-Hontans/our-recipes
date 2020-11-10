import React from "react";
import "./home.css";
import { RecipeCard } from '../recipe-card/recipe-card';
import { CardColumns } from "react-bootstrap";
import API from "../../utils/API";

const getAllRecipes = async () => {
  try {
    const { data } = await API.getAllRecipes();
    return data.recipes;
  } catch (error) {
    console.error(error);
  }
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: []
    };
  }

  async componentDidMount() { 
    const recipes = await getAllRecipes();
    this.setState({ recipes });
  }

  render() {
    return (
      <CardColumns>
        {this.state.recipes.map((recipe, index) => <RecipeCard key={recipe._id} recipe={recipe} index={index}></RecipeCard>)}
      </CardColumns> 
    )
  }
}