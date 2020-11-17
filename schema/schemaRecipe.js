const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    preparingTime: {
      type: String,
      required: true
    },
    bakingTime: {
      type: String,
      required: true
    },
    people: {
      type: Number,
      required: true
    },
    difficulty: {
      type: Number,
      required: true
    },
    cheap: {
      type: Number,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true
    },
    instructions: {
      type: Array,
      required: true
    },
    quote: {
      type: String,
      required: true
    },
    imageId: {
      type: String
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Recipe", recipeSchema);