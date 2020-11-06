import React from "react";
import "./home.css";
import { RecipeCard } from '../recipe-card/recipe-card';
import { CardColumns } from "react-bootstrap";

const recipes = [
  {
    title: 'salade',
    tags: ['starter']
  },
  {
    title: 'soupe de choux',
    tags: ['starter', 'vege']
  },
  {
    title: 'salade',
    tags: ['dish']
  },
  {
    title: 'soupe de choux',
    tags: ['dish', 'vegan']
  },
  {
    title: 'salade',
    tags: ['dessert']
  },
];

export const Home = () =>
  <CardColumns>
    {recipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} index={index}></RecipeCard>)}
  </CardColumns>