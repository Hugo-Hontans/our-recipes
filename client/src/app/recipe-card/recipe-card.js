import React from "react";
import "./recipe-card.css";
import { Card, Badge } from "react-bootstrap";
import cutleryImg from '../../assets/images/cutlery.jpg';


export const RecipeCard = (props) =>
  <Card bg="dark" text="white" style={{ width: '18rem' }}>
    <Card.Img variant="top" src={cutleryImg} alt="cutlery" />
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