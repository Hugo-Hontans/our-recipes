import React from "react";
import "./recipe-card.css";
import { Card, Badge } from "react-bootstrap";
import cutleryImg from '../../assets/images/cutlery.jpg';
import { recipeImageUrl } from '../../utils/API';
import { Link } from "react-router-dom";

export const RecipeCard = (props) =>
  <Link to={`view/${props.recipe._id}`}>
    <Card bg="dark" text="white" style={{ width: '18rem' }}>
      {
        props.recipe.imageId
        ? <Card.Img height="200" variant="top" src={`${recipeImageUrl}/${props.recipe.imageId}`} alt="recipe ready to eat" />
        : <Card.Img height="200" variant="top" src={cutleryImg} alt="cutlery" />
      }
      <Card.ImgOverlay>
        { props.recipe.tags.map((tag, index) => 
            <Badge pill variant="info" key={index}>
              {tag}
            </Badge>
        )}
      </Card.ImgOverlay>
      <Card.Body>
        <Card.Title>{props.recipe.title}</Card.Title>
      </Card.Body>
    </Card>
  </Link>