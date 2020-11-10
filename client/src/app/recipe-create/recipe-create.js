import React, { useState } from "react";
import "./recipe-create.css";
import { Button, Form } from "react-bootstrap";

const tagLabels = ['Starter', 'Dish', 'Dessert', 'Drink', 'Accompaniment', 'Vege', 'Vegan'];

export const RecipeCreate = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);

  const handleChangeTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleChangeTag = (event) => {
    const value = event.target.value;
    const newTags = tags;
    // Add or remove tag of state
    newTags.includes(value) ? newTags.splice(newTags.indexOf(value), 1) : newTags.push(value);
    setTags(newTags);
  };

  const create = () => {
    console.log({
      title,
      tags
    });
  };

  return (
    <Form onSubmit={(event) => {create(); event.preventDefault();}}>
      <Form.Group controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={handleChangeTitle} type="text" placeholder="Title" />
      </Form.Group>

      <Form.Group controlId="tags">
        <Form.Label>Tags</Form.Label>
        { tagLabels.map((label, index) =>
          <Form.Check
            key={index}
            type="checkbox"
            label={label}
            value={label}
            onChange={handleChangeTag}
          />
        )}
        <Form.Text className="text-muted">
          Choose one or mutiple tags.
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Create my recipe
      </Button>
    </Form>
  )
}