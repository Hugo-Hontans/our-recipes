import React, { useState } from "react";
import "./recipe-view.css";
import { useParams } from "react-router-dom";

export const RecipeView = () => {
  const { id } = useParams();

  return (
    <section>Recipe View</section>
  )
}