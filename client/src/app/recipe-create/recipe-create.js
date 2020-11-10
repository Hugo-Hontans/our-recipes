import React, { useState } from "react";
import "./recipe-create.css";
import { Button, Form, Alert } from "react-bootstrap";
import API from "../../utils/API";
import { wait } from "../../utils/helpers";

const tagLabels = ['Starter', 'Dish', 'Dessert', 'Drink', 'Accompaniment', 'Vege', 'Vegan'];

export const RecipeCreate = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInError, setIsInError] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);

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

  const create = async () => {
    try {
      if (isInError) setIsInError(false);
      setIsSubmitting(true);
      await API.createRecipe({
      title,
      tags
      });
      setIsSubmitting(false);
      // Display success and reset form
      setIsSuccessed(true);
      await wait(3000);
      setTitle('');
      setIsSuccessed(false);
    } catch {
      // Display error
      setIsInError(true);
      setIsSubmitting(false);
    }
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

      <Button variant="primary" type="submit" disabled={isSubmitting}>
        Create my recipe
      </Button>
      {
        isInError ? <Alert variant="danger">An error occured, please try again later.</Alert> : null
      }
      {
        isSuccessed ? <Alert variant="success">Your recipe has been successfully saved.</Alert> : null
      }
    </Form>
  )
}