import React, { useState } from "react";
import "./recipe-create.css";
import { Button, Form, Alert } from "react-bootstrap";
import API from "../../utils/API";
import { wait } from "../../utils/helpers";

const tagLabels = ['Starter', 'Dish', 'Dessert', 'Drink', 'Accompaniment', 'Vege', 'Vegan'];

export const RecipeCreate = () => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [preparingTime, setPreparingTime] = useState('');
  const [bakingTime, setBakingTime] = useState('');
  const [people, setPeople] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [cheap, setCheap] = useState('');
  const [quote, setQuote] = useState('');
  const [ingredients, setIngredients] = useState(['']);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isInError, setIsInError] = useState(false);
  const [isSuccessed, setIsSuccessed] = useState(false);

  const handleChangeTag = (event) => {
    const value = event.target.value;
    const newTags = tags;
    // Add or remove tag of state
    newTags.includes(value) ? newTags.splice(newTags.indexOf(value), 1) : newTags.push(value);
    setTags(newTags);
  };

  const handleChangeIngredients = (event, index) => {
    const value = event.target.value;
    const newIngredients = ingredients;
    newIngredients[index] = value;
    setIngredients([...newIngredients]);
  };

  const addIngredient = () => {
    const newIngredients = ingredients;
    newIngredients.push('');
    setIngredients([...newIngredients]);
  };

  const removeIngredient = (index) => {
    const newIngredients = ingredients;
    newIngredients.splice(index, 1);
    setIngredients([...newIngredients]);
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
        <Form.Control value={title} onChange={event => setTitle(event.target.value)} type="text" placeholder="Title" />
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

      <Form.Group controlId="time">
        <Form.Label>Preparing Time (minutes)</Form.Label>
        <Form.Control value={preparingTime} onChange={event => setPreparingTime(event.target.value)} type="number" placeholder="Time to prepare" />
        <Form.Label>Baking Time (minutes)</Form.Label>
        <Form.Control value={bakingTime} onChange={event => setBakingTime(event.target.value)} type="number" placeholder="Time to bake" />
      </Form.Group>

      <Form.Group controlId="people">
        <Form.Label>People</Form.Label>
        <Form.Control value={people} onChange={event => setPeople(event.target.value)} type="number" placeholder="Number of people" />
      </Form.Group>

      <Form.Group controlId="difficulty">
        <Form.Label>Difficulty (1 to 3)</Form.Label>
        <Form.Control value={difficulty} onChange={event => setDifficulty(event.target.value)} type="number" placeholder="Difficulty" min="1" max="3" />
      </Form.Group>

      <Form.Group controlId="cheap">
        <Form.Label>Cheap (1 to 3)</Form.Label>
        <Form.Control value={cheap} onChange={event => setCheap(event.target.value)} type="number" placeholder="Cheap" min="1" max="3" />
      </Form.Group>

      <Form.Group controlId="ingredients">
        <Form.Label>List of ingredients</Form.Label>
        <Button className="control" variant="primary" size="sm" onClick={() => addIngredient()}>+</Button>
      {
        ingredients.map((ingredient, index) =>
          <div key={index}>
            <Form.Label>Ingredient {index + 1}</Form.Label>
            <div className="inline">
              <Form.Control value={ingredient} onChange={event => handleChangeIngredients(event, index)} type="text" />
              <Button variant="danger" size="sm" onClick={() => removeIngredient(index)}>X</Button>
            </div>
          </div>     
        )
      }
      </Form.Group>

      <Form.Group controlId="quote">
        <Form.Label>My quote</Form.Label>
        <Form.Control value={quote} onChange={event => setQuote(event.target.value)} type="text" placeholder="To taste with..." />
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