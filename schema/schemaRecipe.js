const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema(
  {
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Recipe", recipeSchema);